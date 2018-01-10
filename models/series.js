var mongoose = require('mongoose');

var seriesSchema = new mongoose.Schema({
    bookUser: {
        type: String,
        required: false
    },
    bookSeries: {
        type: String,
        required: false
    }
}, {
    collection: 'series'
});

var Series = mongoose.model('Series', seriesSchema);

module.exports = Series;
