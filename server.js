"use strict";

var User = require('./models/user');
var Book = require('./models/book');
var Series = require('./models/series')
var bodyParser = require('body-parser');
var config = require('./config');
var unirest = require('unirest');
var events = require('events');
var mongoose = require('mongoose');
var cors = require('cors');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var https = require('https');
var http = require('http');
var express = require('express');
var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

mongoose.Promise = global.Promise;

var server = undefined;

function runServer(databaseUrl) {
    if (databaseUrl == "") {
        databaseUrl = config.DATABASE_URL;
    }
    return new Promise(function (resolve, reject) {
        mongoose.connect(databaseUrl, function (err) {
            if (err) {
                return reject(err);
            }
            server = app.listen(config.PORT, function () {
                console.log('Listening on localhost:' + config.PORT);
                resolve();
            }).on('error', function (err) {
                mongoose.disconnect();
                reject(err);
            });
        });
    });
}

if (require.main === module) {
    runServer(config.DATABASE_URL).catch(function (err) {
        return console.error(err);
    });
};

function closeServer() {
    return mongoose.disconnect().then(function () {
        return new Promise(function (resolve, reject) {
            console.log('Closing server');
            server.close(function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            });
        });
    });
}


// POST: signing in a user
// next step is verifying and validating the user credentials
app.post('/login', function (req, res) {
    var user = req.body.username;
    var pwd = req.body.password;
    User
        .findOne({
            username: req.body.username
        }, function (err, items) {
            if (err) {
                return res.status(500).json({
                    message: "Internal server error"
                });
            }
            if (!items) {
                // bad username
                return res.status(401).json({
                    message: "Not found!"
                });
            } else {
                items.validatePassword(req.body.password, function (err, isValid) {
                    if (err) {
                        console.log('There was an error validating the password.');
                    }
                    if (!isValid) {
                        return res.status(401).json({
                            message: "Not found"
                        });
                    } else {
                        var logInTime = new Date();
                        console.log("User logged in: " + req.body.username + ' at ' + logInTime);
                        return res.json(items);
                    }
                });
            };
        });
});

// POST: creating a new user
// TODO: ensure a user cannot sign up with the same username as already exists in the system
app.post('/users/create', function (req, res) {
    var username = req.body.username;
    username = username.trim();
    var password = req.body.password;
    password = password.trim();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return res.status(500).json({
                message: 'Internal server error'
            });
        }

        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }

            User.create({
                username: username,
                password: hash,
            }, function (err, item) {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal Server Error'
                    });
                }
                if (item) {
                    console.log("User `" + username + "` created.");
                    return res.json(item);
                }
            });
        });
    });
});

//// ----------- BOOK ENDPOINTS ------------------------

// external API call
var getBooksFromGoogle = function (searchTerm) {
    var emitter = new events.EventEmitter();
    unirest.get('https://www.googleapis.com/books/v1/volumes?q=' + searchTerm + '&maxResults=30&key=AIzaSyB4W3-wdcG_-eTcoNMuLalqYQtnkcCv-d0')
        //after api call we get the response inside the "response" parameter
        .end(function (response) {
            //success scenario
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            //failure scenario
            else {
                emitter.emit('error', response.code);
            }
        });
    return emitter;
};


// GET: make API call for Google Books search results
app.get('/search/:searchTerm', function (req, res) {
    var searchRequest = getBooksFromGoogle(req.params.searchTerm);
    //get the data from the first api call
    searchRequest.on('end', function (item) {
        res.json(item);
    });

    //error handling
    searchRequest.on('error', function (code) {
        res.sendStatus(code);
    });
});



// POST: creating a new book
app.post('/add-to-favorites', function (req, res) {
    // send the local data to the database
    Book.create({
        bookTitle: req.body.bookTitle,
        bookSubtitle: req.body.bookSubtitle,
        bookAuthor: req.body.bookAuthor,
        bookThumbnail: req.body.bookThumbnail,
        bookUser: req.body.bookUser,
        bookPublished: req.body.bookPublished,
        bookSeries: req.body.bookSeries
    }, function (err, lead) {
        // return the result of DB call
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // send the result back to client.js
        res.status(201).json(lead);

    });
});



app.get('/get-favorites/:username', function (req, res) {
    Book.find({
            bookUser: req.params.username
        },

        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }

            res.status(200).json(item);
        });
});

// POST: creating a new series
// local API endpoint in server.js
app.post('/series/create', function (req, res) {
    // step b5: send the local data to the database
    Series.create({
        bookUser: req.body.username,
        bookSeries: req.body.bookSeries
    }, function (err, lead) {
        // step b6: return the result of DB call
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        // step b7: send the result back to client.js
        res.status(201).json(lead);
    });
});

// GET: get series list
app.get('/get-series/:username', function (req, res) {
    console.log(req.params.username, "test");
    Series.find({
            bookUser: req.params.username
        },
        function (err, item) {
            if (err) {
                return res.status(500).json({
                    message: 'Internal Server Error'
                });
            }
            res.status(200).json(item);
        });
});

// PUT: update a book entry with series
app.put('/get-favorites/:id', function (req, res) {
    var toUpdate = {};
    var updateableFields = ['bookSeries'];
    updateableFields.forEach(function (field) {
        if (field in req.body) {
            toUpdate[field] = req.body[field];
            console.log(field);
        }
    });
    Book.findByIdAndUpdate(req.params.id, {
        $set: toUpdate
    }).exec().then(function (result) {
        console.log(result);
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});


// DELETE: deleting a lead
app.delete('/get-favorites/:id', function (req, res) {
    Book.findByIdAndRemove(req.params.id).exec().then(function (Book) {
        return res.status(204).end();
    }).catch(function (err) {
        return res.status(500).json({
            message: 'Internal Server Error'
        });
    });
});

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function (req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});

exports.app = app;
exports.runServer = runServer;
exports.closeServer = closeServer;
