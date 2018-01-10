# Book Series Tracker

Organize your digital library and be alerted of new releases by your favorite authors.

## Screenshots
Desktop:

![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-1.png)
![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-2.png)
![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-3.png)
![Desktop](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/screen-shot-4.png)


## Use Case
This app helps readers track books they have read and learn about new book releases by those authors.

## User stories
1.1 As a visitor, I want to land on website and learn what it is about.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-1.JPG)

1.2 As a visitor, I can sign up for an account in order to create a profile.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-2.JPG)

1.3 As a user, I can log into my account in order to save my progress.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-6.JPG)

1.5 As a user, I can view my dashboard when I log in in order to see integrated data about my account.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-3.JPG)

1.4 As a user, I can search for books or authors I have read so that I can add them to my profile.

1.6 As a user, I can add books to my profile so that I can keep track of what I have read.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-4.JPG)

1.7 As a user, I can view a list of new releases by authors I follow so that I can find new books in a series.

2.3 As a user, I can remove new releases from the list if I am uninterested in order to clean up the results.

1.8 As a user, I can add new releases to my profile in order to follows those authors or indicated I have read the book.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-5.JPG)

2 As a user, I can see my entire library from a profile page.

2 As a user, I can create and organize my library by series.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-7.JPG)

2 As a user, I can assign a series to books in my library using a dropdown menu.
![Wireframe](https://github.com/EGrebowski/book-series-tracker-node-capstone/blob/master/github-images/user-story-8.JPG)

2.1 As a user, I can click on a book in the list for a plot summary so that I can refresh my memory on the book.

<!--3.3 As a user, I can group books by genre.-->

3.1 As a user, I can select favorites from my library in order to better organize my profile.

3.2 As a user, I can remove books from my profile in order to clear space if I no longer want to follow the author.

3.5 As a user, I can indicate if a books series is complete in order to better organize my profile.


## Working Prototype
You can access a working prototype of the app at [https://bias-balanced-news.herokuapp.com/](https://bias-balanced-news.herokuapp.com/).

## Technical
This app is built using HTML, CSS, JavaScript, jQuery, and Node.js.

Usernames, encrypted passwords (encrypted using salted hashing with [bcrypt.js](https://www.npmjs.com/package/bcryptjs)), and job lead information are stored and accessed from an [mLab](https://mlab.com) database.

Other technologies used include MongoDB, Mongoose, Passport, Express, Mocha, and Chai.

The app is designed to be responsive across desktop, tablet, and mobile platforms.
