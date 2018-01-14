var mongoose = require('mongoose');

var articleSchema = new mongoose.Schema({
    articleTitle: {
        type: String,
        required: false
    },
    articleUrl: {
        type: String,
        required: false
    },
    articleSource: {
        type: String,
        required: false
    }
}, {
    collection: 'articles'
});

const article = mongoose.model('article', articleSchema);

module.exports = article;
