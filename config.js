exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://admin:admin@ds249737.mlab.com:49737/bias-balanced-news-api-fullstack-capstone';
exports.TEST_DATABASE_URL = process.env.TEST_DATABASE_URL ||
    'mongodb://admin:admin@ds249737.mlab.com:49737/bias-balanced-news-api-fullstack-capstone';
exports.PORT = process.env.PORT || 8080;
