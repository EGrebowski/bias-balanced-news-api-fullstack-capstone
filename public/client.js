"use strict";

$(document).ready(function (event) {
    $(".news").hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
});

// Get started
$("#get-started").on("click", function (event) {
    $(".news").show();
    $('header').hide();
    $('.info-section').hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
});

// Return to landing page
$("nav h3").on("click", function (event) {
    $("header").show();
    $(".info-section").show();
    $(".news").hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
});

//navigate to news section from navbar
$('#nav-news').on("click", function (event) {
    $(".news").show();
    $('header').hide();
    $('.info-section').hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
});

//navigate to reading list fullpage section from navbar
$('#nav-reading-list').on("click", function (event) {
    $(".reading-list-full-page").show();
    $(".news").hide();
    $('header').hide();
    $('.info-section').hide();
    $(".index").hide();
});

//navigate to index section from navbar
$('#nav-index').on("click", function (event) {
    $(".reading-list-full-page").hide();
    $(".news").hide();
    $('header').hide();
    $('.info-section').hide();
    $(".index").show();
});

//toggle Add button with Success Message
//    $('.add').on("click", this, function (event) {
//        $(this).next('.added').toggle();
//        $(this).toggle();
//    });


function getHeadlinesBySource(sourceName) {
    console.log(sourceName);
    $.ajax({
            type: "GET",
            url: "/get-headlines/" + sourceName,
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call is successful
        .done(function (result) {
            // display search results
            console.log(result);
            displayHeadlinesBySource(sourceName, result.articles);
        })
        // if API call unsuccessful
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Something went wrong');
        });
}

function displayHeadlinesBySource(sourceName, data) {
    var buildTheHtmlOutput = '<h5>' + sourceName + '</h5>';
    buildTheHtmlOutput += '<ul class="articles">';
    $.each(data, function (dataKey, dataValue) {
        buildTheHtmlOutput += '<li class="article">';
        buildTheHtmlOutput += '<a href="' + dataValue.url + '">' + dataValue.title + '</a><br />';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-title" value="' + dataValue.title + '">';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-url" value="' + dataValue.url + '">';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-source" value="' + dataValue.source.name + '">';
        buildTheHtmlOutput += '<button class="add">Add to my reading list</button>';
        buildTheHtmlOutput += '<p class="added">Added to "My Articles"</p>';
        buildTheHtmlOutput += '</li>';
    });
    buildTheHtmlOutput += '</ul>';
    //use the HTML output to show it in the index.html
    $("#" + sourceName).html(buildTheHtmlOutput);
    // toggle Add button
    $(".added").hide();
    $('.add').on("click", this, function (event) {
        $(this).next('.added').toggle();
        $(this).toggle();
    });
}

function populateReadingList() {
    console.log("populateReadingList ran");
    $.ajax({
            type: "GET",
            url: "/get-reading-list/",
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call successful
        .done(function (result) {
            console.log(result);
            displayReadingList(result);
        })
        // if API call unsuccessful
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Something went wrong');
        });
}

function displayReadingList(articles) {
    console.log("displayReadingList ran");
    var buildTheHtmlOutput = '';
    if (articles.length == 0) {
        var htmlOutput = "Select articles to add to your reading list";
    } else {
        $.each(articles, function (index, value) {
            console.log(value);
            buildTheHtmlOutput += '<li><a href="' + value.articleUrl + '">' + value.articleTitle + '</a><i class="fa fa-times" aria-hidden="true"></i>';
            buildTheHtmlOutput += '<p>' + value.articleSource + '</p>';
            buildTheHtmlOutput += '</li>';
        });
        $(".reading-list-sidebar-articles").html(buildTheHtmlOutput);
    }
}

// get headlines with external API
$("#nav-news").on("click", function (event) {
    event.preventDefault();
    getHeadlinesBySource("the-new-york-times");
    getHeadlinesBySource("usa-today");
    getHeadlinesBySource("fox-news");
    getHeadlinesBySource("the-washington-post");
    getHeadlinesBySource("reuters");
    getHeadlinesBySource("the-wall-street-journal");
    getHeadlinesBySource("the-huffington-post");
    getHeadlinesBySource("politico");
    getHeadlinesBySource("financial-post");
    //    getHeadlinesBySource("fortune");
});
$("#get-started").on("click", function (event) {
    getHeadlinesBySource("the-new-york-times");
    getHeadlinesBySource("usa-today");
    getHeadlinesBySource("fox-news");
    getHeadlinesBySource("the-washington-post");
    getHeadlinesBySource("reuters");
    getHeadlinesBySource("the-wall-street-journal");
    getHeadlinesBySource("the-huffington-post");
    getHeadlinesBySource("politico");
    getHeadlinesBySource("financial-post");
});

$(document).on('click', '.add', function (event) {
    let articleTitle = $(this).parent().find('.add-to-reading-list-title').val();
    let articleUrl = $(this).parent().find('.add-to-reading-list-url').val();
    let articleSource = $(this).parent().find('.add-to-reading-list-source').val();
    const newsArticle = {
        'articleTitle': articleTitle,
        'articleUrl': articleUrl,
        'articleSource': articleSource
    };
    console.log(newsArticle);
    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(newsArticle),
            url: '/add-to-reading-list'
        })
        .done(function (result) {
            console.log(result);
            populateReadingList();
        })
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Oops...', 'Please try again', 'error');
        });
});


//// logged in username global variable
//var username = "";
//var searchTerm = "";
//
//function sortByKey(array, key) {
//    return array.sort(function (a, b) {
//        var x = a[key];
//        var y = b[key];
//        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
//    });
//}
//

//
//function populateFavoritesContainer(username) {
//    console.log("populateFavoritesContainer ran");
//    $.ajax({
//            type: "GET",
//            url: "/get-favorites/" + username,
//            dataType: 'json',
//            contentType: 'application/json'
//        })
//        // if API call is successful
//        .done(function (result) {
//            // display search results
//            console.log(result);
//            displayFavoritesContainer(result);
//        })
//        // if API call unsuccessful
//        .fail(function (jqXHR, error, errorThrown) {
//            // return errors
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            alert('Something went wrong');
//        });
//}
//
//function displayFavoritesContainer(books) {
//    var buildTheHtmlOutput = '';
//    if (books.length == 0) {
//        var htmlOutput = "Sorry, no books!";
//    } else {
//        $.each(books, function (index, value) {
//            if (value.bookSeries == "") {
//                buildTheHtmlOutput += '<div class="book-entry col-4">';
//                buildTheHtmlOutput += '<form action="#" name="delete-book" class="delete-book">';
//                buildTheHtmlOutput += '<input type="hidden" class="formID" value="' + value._id + '">';
//                buildTheHtmlOutput += '<button class="delete-series" type="submit"><i class="fa fa-trash" aria-hidden="true"></i></button>';
//                buildTheHtmlOutput += '</form>';
//                buildTheHtmlOutput += '<div class="image-background">';
//                buildTheHtmlOutput += '<img title="' + value.bookTitle + '" src="' + value.bookThumbnail + '">';
//                buildTheHtmlOutput += '</div>';
//                buildTheHtmlOutput += '<p title="' + value.bookTitle + '" class="book-title">' + value.bookTitle + '</p>';
//                buildTheHtmlOutput += '<p class="author">' + value.bookAuthor + '</p>';
//                buildTheHtmlOutput += '<form action="#" name="series-finder" class="series-finder">';
//                buildTheHtmlOutput += '<input type="hidden" class="formID" value="' + value._id + '">';
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-title" value="' + value.bookTitle + '">';
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-subtitle" value="' + value.bookTitle + '">';
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-author" value="' + value.bookAuthor + '">';
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-thumbnail" value="' + value.bookThumbnail + '">';
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-series-book-user" value="' + username + '">';
//                buildTheHtmlOutput += '<select name="series-input" class="add-to-series-name" placeholder="select series">';
//                buildTheHtmlOutput += '</select>';
//                buildTheHtmlOutput += '<button class="assign-series" type="submit">Assign</button>';
//                buildTheHtmlOutput += '</form>';
//                buildTheHtmlOutput += '</div>';
//            }
//        });
//        populateSeriesDropdown(username);
//        //use the HTML output to show it in the index.html
//        $(".loose-books").html(buildTheHtmlOutput);
//    }
//}
//
//function assignUserToSeries(username) {
//    var buildTheHtmlOutput = '';
//    buildTheHtmlOutput += '<label for="series-input">Create a Book Series</label><br>';
//    buildTheHtmlOutput += '<input type="text" name="series-input" id="series-input" placeholder="series name">';
//    buildTheHtmlOutput += '<input type="hidden" class="series-user" value="' + username + '">';
//    buildTheHtmlOutput += '<button type="submit">Create</button>';
//    $("#create-series").html(buildTheHtmlOutput);
//}
//
//function populateSeriesContainer(username) {
//    console.log("populateSeriesContainer ran");
//    $.ajax({
//            type: "GET",
//            url: "/get-favorites/" + username,
//            dataType: 'json',
//            contentType: 'application/json'
//        })
//        // if API call is successful
//        .done(function (result) {
//            // display search results
//            console.log(result);
//            displayBooksBySeries(result);
//            // show or hide books in series
//            $('.books-by-series .book-entry').hide();
//            $('.series-title').on("click", this, function (event) {
//                console.log("toggle books");
//                $(this).nextUntil('.series-title').toggle();
//            });
//        })
//        // if API call unsuccessful
//        .fail(function (jqXHR, error, errorThrown) {
//            // return errors
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            alert('Something went wrong');
//        });
//}
//
//function displayBooksBySeries(books) {
//    var buildTheHtmlOutput = '';
//    let output = sortByKey(books, 'bookSeries');
//    console.log(output);
//    let currentSeries = "";
//    let oldSeries = "";
//    $.each(output, function (index, value) {
//        if (value.bookSeries != "") {
//            currentSeries = value.bookSeries;
//            if (currentSeries != oldSeries) {
//                buildTheHtmlOutput += '<div class="series-title col-12">';
//                buildTheHtmlOutput += value.bookSeries + ',  ' + value.bookAuthor;
//                buildTheHtmlOutput += '</div>';
//            }
//            buildTheHtmlOutput += '<div class="book-entry col-3">';
//            buildTheHtmlOutput += '<div class="image-background">';
//            buildTheHtmlOutput += '<img title="' + value.bookTitle + '" src="' + value.bookThumbnail + '" />';
//            buildTheHtmlOutput += '</div>';
//            buildTheHtmlOutput += '<p title="' + value.bookTitle + '" class="book-title">' + value.bookTitle + '</p>';
//            buildTheHtmlOutput += '<p class="author">' + value.bookAuthor + '</p>';
//            buildTheHtmlOutput += '</div>';
//            oldSeries = currentSeries;
//        }
//
//    });
//    $('.books-by-series').html(buildTheHtmlOutput);
//}
//
//function populateSeriesDropdown(username) {
//    console.log(username);
//    $.ajax({
//            type: "GET",
//            url: "/get-series/" + username,
//            dataType: 'json',
//            contentType: 'application/json'
//        })
//        // if API call is successful
//        .done(function (result) {
//            // display search results
//            console.log(result);
//            displayDropdown(result);
//        })
//        // if API call unsuccessful
//        .fail(function (jqXHR, error, errorThrown) {
//            // return errors
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            alert('Something went wrong');
//        });
//}
//
//function displayDropdown(series) {
//    var buildTheHtmlOutput = '<option value="" disabled selected>Select a Series</option>';
//    $.each(series, function (index, value) {
//        buildTheHtmlOutput += '<option value="' + value.bookSeries + '">' + value.bookSeries + '</option>';
//    });
//    //use the HTML output to show it in the index.html
//    $(".add-to-series-name").html(buildTheHtmlOutput);
//}
//
//


//// remove book entry from new releases
//$('.remove').on("click", function (event) {
//    $('.book-entry').eventCurrentTarget.hide();
//});
//

//
//
//// populate the series dropdown
//$("#create-series").on("submit", function (event) {
//    event.preventDefault();
//    var seriesName = $("#series-input").val();
//    var bookUser = $(".series-user").val();
//    var seriesObject = {
//        username: bookUser,
//        bookSeries: seriesName
//    }
//    console.log(bookUser);
//    //     check for valid input
//    if (seriesName.length < 1) {
//        alert('Please enter a series name');
//    }
//    // if series is valid
//    else {
//        $.ajax({
//                type: "POST",
//                url: "/series/create",
//                dataType: 'json',
//                data: JSON.stringify(seriesObject),
//                contentType: 'application/json'
//            })
//            // if API call is successful
//            .done(function (result) {
//                // display series in dropdown
//                console.log(result);
//                populateSeriesDropdown(bookUser);
//                // reset input
//                seriesName = "";
//                $("#series-input").val("");
//            })
//            // if API call unsuccessful
//            .fail(function (jqXHR, error, errorThrown) {
//                // return errors
//                console.log(jqXHR);
//                console.log(error);
//                console.log(errorThrown);
//                alert('Something went wrong');
//            });
//    }
//});
//
//
//
//// classify books by series
//$(document).on('submit', '.series-finder', function (event) {
//    event.preventDefault();
//    var bookUser = $(this).parent().find('.add-to-series-book-user').val();
//    console.log(bookUser);
//    var bookSeries = $(this).parent().find('.add-to-series-name').val();
//    let idParameter = $(this).parent().find('.formID').val();
//    var updatedObject = {
//        'bookSeries': bookSeries
//    };
//    console.log(updatedObject);
//    $.ajax({
//            method: 'PUT',
//            dataType: 'json',
//            contentType: 'application/json',
//            data: JSON.stringify(updatedObject),
//            url: "/get-favorites/" + idParameter
//        })
//        .done(function (result) {
//            // refresh profile
//            populateFavoritesContainer(bookUser);
//            populateSeriesContainer(bookUser)
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            // return errors
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            alert('Something went wrong');
//        });
//});
//
//// delete books
//$(document).on('submit', '.delete-book', function (event) {
//    event.preventDefault();
//    var bookUser = $(this).parent().find('.add-to-series-book-user').val();
//    let idParameter = $(this).parent().find('.formID').val();
//    console.log(idParameter);
//    $.ajax({
//            method: 'DELETE',
//            url: "/get-favorites/" + idParameter
//        })
//
//        .done(function (result) {
//            // refresh profile to remove displayed book
//            populateFavoritesContainer(bookUser);
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            // return errors
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            alert('Something went wrong');
//        });
//});
//
//// when user clicks log out
//document.getElementById('logout').addEventListener('click', function () {
//    location.reload();
//});
