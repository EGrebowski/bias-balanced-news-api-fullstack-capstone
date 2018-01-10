// connect to db
// insert seed data into db
// make HTTP requests to API using the test client
// inspect the state of the db after request is made
// tear down the db


const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const book = require('../models/book');
console.log(book);

const Series = require('../models/series');

const User = require('../models/user');
console.log(User);

// Import server.js and use destructuring assignment to create variables for
// server.app, server.runServer, and server.closeServer
const {
    app,
    runServer,
    closeServer
} = require('../server');


const {
    TEST_DATABASE_URL
} = require('../config');


const should = require('chai').should();
chai.use(chaiHttp);

// function definitions
function seedBookData() {
    console.info('Seeding book data')
    const seedData = [];
    for (let i = 0; i < 10; i++) {
        seedData.push(generateBookData());
    }
    console.log(seedData);
    console.log(book);
    // should return a promise
    return book.insertMany(seedData);
}

//const testUsername = faker.random.word() + faker.random.number();
const searchTerm = 'Harry Potter';

const newUser = {
    username: 'testusername',
    password: 'testpassword'
}

function generateUserData() {
    return {
        username: faker.lorem.word(),
        password: faker.internet.password()
    }
}

function generateBookData() {
    return {
        bookTitle: faker.lorem.sentence(),
        //        bookSubtitle: faker.lorem.sentence(),
        bookAuthor: faker.random.word(),
        bookThumbnail: 'public/images/book-thumbnail-placeholder.jpg',
        bookUser: newUser.username,
        bookSeries: faker.lorem.sentence()
    }
}

function generateSeries() {
    return {
        bookSeries: faker.lorem.sentence()
    }
}

function tearDownDb() {
    console.warn('Deleting database');
        return mongoose.connection.dropDatabase();
}

describe('users', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL)
            .then(console.log('running server'))
            .catch(err => console.log({
                err
            }));
    });
    describe('POST endpoint', function () {
        const newUser = generateUserData();
        it('should create a new user', function () {
            return chai.request(app)
                .post('/users/create')
                .send(newUser)
                .then(function (res) {
                    //                res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        '_id', 'username', 'password', '__v');
                    res.body._id.should.not.be.null;
                    res.body.username.should.equal(newUser.username);
                    return User.findById(res.body._id);
                })
                .then(function (user) {
                    user.username.should.equal(newUser.username);
                });
        });
    });

})

describe('books', function () {
    before(function () {
        return runServer(TEST_DATABASE_URL)
            .then(console.log('running server'))
            .catch(err => console.log({
                err
            }));
    });
    beforeEach(function () {
        return seedBookData();
    });
    afterEach(function () {
        return tearDownDb();
    });

    describe('GET endpoint', function () {
        it('should return all books in db for the user', function () {
            let res;
            return chai.request(app)
                .get('/get-favorites/' + newUser.username)
                .then(function (_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.should.have.length.of.at.least(1);
                    return book.count();
                })
                .then(function (count) {
                    res.body.should.have.length.of(count);
                });
        });
        it('should return books with the correct fields', function () {
            return chai.request(app)
                .get('/get-favorites/:' + newUser.username)
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                    //                    res.body.should.have.length.of.at.least(1);
                    res.body.forEach(function (book) {
                        book.should.be.a('object');
                        book.should.include.keys(
                            '__v', '_id', 'bookTitle', 'bookAuthor', 'bookThumbnail', 'bookUser', 'bookSeries');
                    })
                });
        });
    });


    describe('POST endpoint', function () {
        it('should add a new book', function () {
            const newBook = generateBookData();
            console.log(newBook);
            return chai.request(app)
                .post('/add-to-favorites/')
                .send(newBook)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        '__v', '_id', 'bookTitle', 'bookAuthor', 'bookThumbnail', 'bookUser', 'bookSeries');
                    res.body.bookTitle.should.equal(newBook.bookTitle);
                    //                    res.body.bookSubtitle.should.equal(newBook.bookSubtitle);
                    res.body.bookAuthor.should.equal(newBook.bookAuthor);
                    res.body.bookThumbnail.should.equal(newBook.bookThumbnail);
                    res.body.bookUser.should.equal(newBook.bookUser);
                    res.body.bookSeries.should.equal(newBook.bookSeries);
                    res.body._id.should.not.be.null;
                    return book.findById(res.body.id);
                });
        });

        it('should add a new series', function () {
            const newSeries = generateSeries();
            console.log(newSeries);
            return chai.request(app)
                .post('/series/create/' + newSeries.bookSeries)
                .send(newSeries)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys(
                        'bookSeries');
                    res.body.bookSeries.should.equal(newSeries.bookSeries);
                    res.body._id.should.not.be.null;
                    return Series.findById(res.body.id);
                });

        });
    });

    describe('PUT endpoint', function () {
        it('should update bookSeries field', function () {
            const updatedData = {
                bookSeries: faker.lorem.sentence()
            };
            return book
                .findOne()
                .then(function (book) {
                    updatedData.id = book.id;
                    updatedData.bookUser = book.bookUser;
                    return chai.request(app)
                        .put(`/get-favorites/${book.id}`)
                        .send(updatedData);
                })
                .then(function (res) {
                    res.should.have.status(204);
                    return book.findById(updatedData.id);
                })
                .then(function (book) {
                    book.bookSeries.should.equal(updatedData.bookSeries);

                });
        });
    });

    describe('DELETE endpoint', function () {
        it('should delete a book from the db', function () {
            return book
                .findOne()
                .then(function (book) {
                    return chai.request(app).delete(`/get-favorites/${book.id}`);
                })
                .then(function (res) {
                    res.should.have.status(204);
                    return book.findById(book.id);
                })
                .then(function (book) {
                    should.not.exist(book);
                })
        });
    });
});
