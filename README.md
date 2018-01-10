# Bias Balanced News

No news source is completely unbiased, and the difference in perspective has become more noticeable than ever. Front page headlines from one source may be nothing more than a footnote in another. With Bias Balanced, compare headlines from a wide array of news outlets in order to get a more complete picture of current events.

## Screenshots
Desktop:

??? ![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-1.png)
??? ![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-2.png)
??? ![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-3.png)
??? ![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-4.png)


## Use Case
This app allows viewers to compare headlines across different news sites. Users can add articles to a personalized reading list and track which news sources are most viewed.

## User stories
1.1 As a visitor, I can land on the website and learn what it is about.
![Wireframe](https://github.com/EGrebowski/bias-balanced-news-api-fullstack-capstone/blob/master/github-images/user-story-1.JPG)

1.2 As a visitor, I can see the top headlines from several different news sources.
![Wireframe](https://github.com/EGrebowski/bias-balanced-news-api-fullstack-capstone/blob/master/github-images/user-story-2.JPG)

1.3 As a user, I can click on an article link to open it in a new window and read it from its source.

2.1 As a user, I can add articles to a reading list in order to read them at a later time.

2.2 As a user, I can email my selected reading list to my inbox in order to read it at a later time.

3.1 As a user, I can see a list of news sources and where they typically fall on the political spectrum.
![Wireframe](https://github.com/EGrebowski/bias-balanced-news-api-fullstack-capstone/blob/master/github-images/user-story-3.JPG)

3.2 As a visitor, I can view whether other visitors to the site are viewing articles from the left or right of the political spectrum, in order to be more aware of my own selections.

4.1 As a user, I can customize my news sources to reduce clutter and see only sources I am most interested in.

## Working Prototype
You can access a working prototype of the app at [https://bias-balanced-news.herokuapp.com/](https://bias-balanced-news.herokuapp.com/).

## Technical
This app is built using HTML, CSS, JavaScript, jQuery, and Node.js.

Usernames and encrypted passwords (encrypted using salted hashing with [bcrypt.js](https://www.npmjs.com/package/bcryptjs)) are stored and accessed from an [mLab](https://mlab.com) database.

Other technologies used include MongoDB, Mongoose, Passport, Express, Mocha, and Chai.

The app is designed to be responsive across desktop, tablet, and mobile platforms.
