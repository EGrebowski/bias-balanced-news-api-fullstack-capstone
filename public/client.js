"use strict";

//last article won't delete from html
//"added" message sometimes works, sometimes doesn't
//won't add new articles after deleted all of them


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
        buildTheHtmlOutput += '<p class="added"><i class="fa fa-check" aria-hidden="true"></i>Added</p>';
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
    var buildTheHtmlOutput = '';
    if (articles.length == 0) {
        $('.no-articles').show();
        $('.reading-list-sidebar-articles').hide();
        $('.reading-list-full-page-articles').hide();
    } else {
        $.each(articles, function (index, value) {
            console.log(value);
            buildTheHtmlOutput += '<li><a href="' + value.articleUrl + '">' + value.articleTitle + '</a><i class="fa fa-times" aria-hidden="true"></i>';
            buildTheHtmlOutput += '<p>' + value.articleSource + '</p>';
            buildTheHtmlOutput += '<input type="hidden" class="article-id" value="' + value._id + '">';
            buildTheHtmlOutput += '</li>';
        });
        $(".reading-list-sidebar-articles").html(buildTheHtmlOutput);
        $(".reading-list-full-page-articles").html(buildTheHtmlOutput);
        $('.reading-list-sidebar-articles').show();
        $('.reading-list-full-page-articles').show();
        $('.no-articles').hide();
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

// add article to reading list
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

// delete article from reading list
$(document).on('click', '.fa-times', function (event) {
    var articleID = $(this).parent().find('.article-id').val();
    console.log(articleID);
    $.ajax({
            method: 'DELETE',
            url: '/get-reading-list/' + articleID
        })
        .done(function (result) {
            // refresh to remove displayed article
            populateReadingList();
        })
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            alert('Something went wrong');
        });
});
