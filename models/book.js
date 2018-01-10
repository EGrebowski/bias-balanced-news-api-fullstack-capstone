var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    bookTitle: {
        type: String,
        required: false
    },
    bookAuthor: {
        type: String,
        required: false
    },
    bookThumbnail: {
        type: String,
        required: false
    },
    bookUser: {
        type: String,
        required: false
    },
    bookSeries: {
        type: String,
        required: false
    }
}, {
    collection: 'books'
});

const book = mongoose.model('book', bookSchema);

module.exports = book;
