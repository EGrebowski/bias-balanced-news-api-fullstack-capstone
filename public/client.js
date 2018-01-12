"use strict";

$(document).ready(function (event) {
    $(".news").hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
    $(".added").hide();
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
$('.add').on("click", this, function (event) {
    $(this).next('.added').toggle();
    $(this).toggle();
});

// show or hide books in series
//            $('.books-by-series .book-entry').hide();
//            $('.series-title').on("click", this, function (event) {
//                console.log("toggle books");
//                $(this).nextUntil('.series-title').toggle();
//            });




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
//// display book entry
//function displayBooks(books) {
//    var buildTheHtmlOutput = '';
//    if (books.items == undefined) {
//        var htmlOutput = "Sorry, no books!";
//    } else {
//        $.each(books.items, function (index, value) {
//            console.log(value.volumeInfo);
//            buildTheHtmlOutput += '<div class="book-entry col-12">';
//            if (value.volumeInfo.imageLinks == undefined) {
//                buildTheHtmlOutput += '<div class="image-background col-2">';
//                buildTheHtmlOutput += '<img src="images/no-image.gif">';
//                buildTheHtmlOutput += '</div>';
//            } else {
//                buildTheHtmlOutput += '<div class="image-background col-2">';
//                buildTheHtmlOutput += '<img src="' + value.volumeInfo.imageLinks.thumbnail + '">';
//                buildTheHtmlOutput += '</div>';
//            }
//            buildTheHtmlOutput += '<div class="book-info col-10">';
//            buildTheHtmlOutput += '<p class="book-title">' + value.volumeInfo.title + '</p>';
//            buildTheHtmlOutput += '<p class="author">' + value.volumeInfo.authors + '</p>';
//            buildTheHtmlOutput += '<p class="book-blurb">' + value.volumeInfo.description + '</p>';
//            buildTheHtmlOutput += '<form class="add-to-favorites">';
//            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-title" value="' + value.volumeInfo.title + '">';
//            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-subtitle" value="' + value.volumeInfo.subtitle + '">';
//            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-author" value="' + value.volumeInfo.authors + '">';
//            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-publish-date" value="' + value.volumeInfo.publishedDate + '">';
//            if (value.volumeInfo.imageLinks == undefined) {
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-thumbnail" value="images/no-image.gif">';
//            } else {
//                buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-thumbnail" value="' + value.volumeInfo.imageLinks.thumbnail + '">';
//            }
//            buildTheHtmlOutput += '<input type="hidden" class="add-to-favorites-book-user" value="' + username + '">';
//            buildTheHtmlOutput += '<button class="add" type="submit">Add to My Profile</button>';
//            buildTheHtmlOutput += '</form>';
//            buildTheHtmlOutput += '</div>';
//            buildTheHtmlOutput += '</div>';
//        });
//        //use the HTML output to show it in the index.html
//        $(".results").html(buildTheHtmlOutput);
//    }
//}
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



//// search for books
//$("#author-search").on("submit", function (event) {
//    // take input from user
//    event.preventDefault();
//    var searchInput = $("#search-input").val();
//    console.log(searchInput);
//    // check username for spaces, empty, undefined
//    if (searchInput.length < 1) {
//        alert('Please enter a search term');
//    }
//    // if search is valid
//    else {
//        $.ajax({
//                type: "GET",
//                url: "/search/" + searchInput,
//                dataType: 'json',
//                contentType: 'application/json'
//            })
//            // if API call is successful
//            .done(function (result) {
//                // display search results
//                console.log(result);
//                displayBooks(result);
//                searchInput = "";
//                $("#search-input").val("");
//                $("#search-results-placeholder").hide();
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
//// remove book entry from new releases
//$('.remove').on("click", function (event) {
//    $('.book-entry').eventCurrentTarget.hide();
//});
//
//$(document).on('submit', '.add-to-favorites', function (event) {
//    event.preventDefault();
//    var bookTitle = $(this).parent().find('.add-to-favorites-book-title').val();
//    var bookSubtitle = $(this).parent().find('.add-to-favorites-book-subtitle').val();
//    var bookAuthor = $(this).parent().find('.add-to-favorites-book-author').val();
//    var bookThumbnail = $(this).parent().find('.add-to-favorites-book-thumbnail').val();
//    var bookUser = $(this).parent().find('.add-to-favorites-book-user').val();
//    var bookPublished = $(this).parent().find('.add-to-favorites-publish-date').val();
//
//    var bookObject = {
//        'bookTitle': bookTitle,
//        'bookSubtitle': bookSubtitle,
//        'bookAuthor': bookAuthor,
//        'bookThumbnail': bookThumbnail,
//        'bookUser': bookUser,
//        'bookPublished': bookPublished,
//        'bookSeries': ""
//    };
//    console.log(bookObject);
//
//    $.ajax({
//            method: 'POST',
//            dataType: 'json',
//            contentType: 'application/json',
//            data: JSON.stringify(bookObject),
//            url: '/add-to-favorites/',
//        })
//        .done(function (result) {
//            populateFavoritesContainer(username);
//            console.log(result);
//        })
//        .fail(function (jqXHR, error, errorThrown) {
//            console.log(jqXHR);
//            console.log(error);
//            console.log(errorThrown);
//            sweetAlert('Oops...', 'Please try again', 'error');
//        });
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
