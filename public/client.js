"use strict";

// best way to handle height of source containers
// source container title


$(document).ready(function (event) {
    $(".news").hide();
    $(".reading-list-full-page").hide();
    $(".index").hide();
    $('#article-count').hide();
    populateReadingList();
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
    $.ajax({
            type: "GET",
            url: "/get-headlines/" + sourceName,
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call is successful
        .done(function (result) {
            // display search results
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
        buildTheHtmlOutput += '<a class="js-article" target="_blank" href="' + dataValue.url + '">' + dataValue.title + '</a><br />';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-title" value="' + dataValue.title + '">';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-url" value="' + dataValue.url + '">';
        buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-source" value="' + dataValue.source.name + '">';
        buildTheHtmlOutput += '<button class="add js-add">Add to my reading list</button>';
        buildTheHtmlOutput += '<p class="added"><i class="fa fa-check" aria-hidden="true"></i>Added</p>';
        buildTheHtmlOutput += '</li>';
    });
    buildTheHtmlOutput += '</ul>';
    //use the HTML output to show it in the index.html
    $("#" + sourceName).html(buildTheHtmlOutput);
    // toggle Add button
    $(".added").hide();
    $('.add').on("click", this, function (event) {
        $(this).next('.added').show();
        $(this).hide();
    });
}

function populateReadingList() {
    $.ajax({
            type: "GET",
            url: "/get-reading-list/",
            dataType: 'json',
            contentType: 'application/json'
        })
        // if API call successful
        .done(function (result) {
            displayReadingList(result);
            displayReadingListCount(result)
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
            buildTheHtmlOutput += '<li class="col-12"><div class="article-info col-11"><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
            buildTheHtmlOutput += '<p>' + value.articleSource + '</p>';
            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '<i class="fa fa-times col-1" aria-hidden="true"></i>';
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

function displayReadingListCount(articles) {
    var buildTheHtmlOutput = '';
    if (articles.length == 0) {
        $('#article-count').hide();
    } else {
        buildTheHtmlOutput += '';
        buildTheHtmlOutput += articles.length;
        $('#article-count').html(buildTheHtmlOutput);
        $('#article-count').show();
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

// set political gauge
let clickCount = 0;
let totalPoliticalCount = [];
let needleValue;
$(document).on('click', '.js-article, .js-add', function (event) {
    let politicalSource = $(this).siblings('.add-to-reading-list-source').val();
    let politicalCount;
    let thisPoliticalCount;
    clickCount += 1;
    // assign numerical value to each source
    if (politicalSource === "The New York Times") {
        thisPoliticalCount = -60;
    } else if (politicalSource === "USA Today") {
        thisPoliticalCount = 0;
    } else if (politicalSource === "Fox News") {
        thisPoliticalCount = 90;
    } else if (politicalSource === "The Washington Post") {
        thisPoliticalCount = -30;
    } else if (politicalSource === "Reuters") {
        thisPoliticalCount = 0;
    } else if (politicalSource === "The Wall Street Journal") {
        thisPoliticalCount = 60;
    } else if (politicalSource === "The Huffington Post") {
        thisPoliticalCount = -90;
    } else if (politicalSource === "Politico") {
        thisPoliticalCount = -10;
    } else if (politicalSource === "Financial Post") {
        thisPoliticalCount = 30;
    }
    // set totalPoliticalCount
    totalPoliticalCount.push(thisPoliticalCount);
    console.log(totalPoliticalCount);
    // calculate sum
    function getSum(total, num) {
        return total + num;
    }
    let politicalSum = totalPoliticalCount.reduce(getSum);
    console.log(politicalSum);
    // calculate average
    needleValue = politicalSum / clickCount;
    console.log(needleValue);
    $('.logo .needle').css('transform', 'rotate(' + needleValue + 'deg)');
});




// send reading list to user
//const sendmail = require('sendmail')();
//
//sendmail({
//    from: 'no-reply@yourdomain.com',
//    to: 'test@qq.com, test@sohu.com, test@163.com ',
//    subject: 'test sendmail',
//    html: 'Mail of test sendmail ',
//}, function(err, reply) {
//    console.log(err && err.stack);
//    console.dir(reply);
//});
