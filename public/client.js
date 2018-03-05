"use strict";

var emailBodyHtml = '';
var emailBodyText = '';

function displayError(message) {
    $("#messageBox span").html(message);
    $("#messageBox").fadeIn();
    $("#messageBox").fadeOut(10000);
};

// landing page
$(document).ready(function (event) {
    $("#messageBox").hide();
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
            console.log(result);
        })
        // if API call unsuccessful
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            displayError('Something went wrong');
        });
}

function displayHeadlinesBySource(sourceName, data) {
    var buildTheHtmlOutput = '';
    $.each(data, function (dataKey, dataValue) {
        if (dataKey == 0) {
            buildTheHtmlOutput = '<h5>' + dataValue.source.name + '</h5>';
            buildTheHtmlOutput += '<ul class="articles">';
            buildTheHtmlOutput += '<li class="article">';
            buildTheHtmlOutput += '<div class="image-wrapper">';
            buildTheHtmlOutput += '<img src="' + dataValue.urlToImage + '">';
            buildTheHtmlOutput += '</div>';
            buildTheHtmlOutput += '<a class="js-article" target="_blank" href="' + dataValue.url + '">' + dataValue.title + '</a><br />';
            buildTheHtmlOutput += '<p class="article-description">' + dataValue.description + '</p>';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-title" value="' + dataValue.title + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-url" value="' + dataValue.url + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-source" value="' + dataValue.source.name + '">';
            buildTheHtmlOutput += '<button class="add js-add">Add to my reading list</button>';
            buildTheHtmlOutput += '<p class="added"><i class="fa fa-check" aria-hidden="true"></i>Added</p>';
            buildTheHtmlOutput += '</li>';
        } else if ((dataKey > 0) && (dataKey < 2)) {
            buildTheHtmlOutput += '<li class="article">';
            buildTheHtmlOutput += '<a class="js-article" target="_blank" href="' + dataValue.url + '">' + dataValue.title + '</a><br />';
            buildTheHtmlOutput += '<p class="article-description">' + dataValue.description + '</p>';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-title" value="' + dataValue.title + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-url" value="' + dataValue.url + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-source" value="' + dataValue.source.name + '">';
            buildTheHtmlOutput += '<button class="add js-add">Add to my reading list</button>';
            buildTheHtmlOutput += '<p class="added"><i class="fa fa-check" aria-hidden="true"></i>Added</p>';
            buildTheHtmlOutput += '</li>';
        } else if (dataKey == 2) {
            buildTheHtmlOutput += '<li class="article">';
            buildTheHtmlOutput += '<a class="js-article" target="_blank" href="' + dataValue.url + '">' + dataValue.title + '</a><br />';
            buildTheHtmlOutput += '<p class="article-description">' + dataValue.description + '</p>';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-title" value="' + dataValue.title + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-url" value="' + dataValue.url + '">';
            buildTheHtmlOutput += '<input type="hidden" class="add-to-reading-list-source" value="' + dataValue.source.name + '">';
            buildTheHtmlOutput += '<button class="add js-add">Add to my reading list</button>';
            buildTheHtmlOutput += '<p class="added"><i class="fa fa-check" aria-hidden="true"></i>Added</p>';
            buildTheHtmlOutput += '</li>';
            buildTheHtmlOutput += '</ul>';
        }
    });
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
            displayReadingListCount(result);
            buildEmailBodyHtml(result);
            refreshNeedle(result);
            console.log(emailBodyHtml);
        })
        // if API call unsuccessful
        .fail(function (jqXHR, error, errorThrown) {
            // return errors
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
            displayError('Something went wrong');
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
            if (value.articleSource === "The New York Times" || value.articleSource === "The Washington Post" || value.articleSource === "MSNBC") {
                buildTheHtmlOutput += '<li class="col-12"><div class="article-info col-11"><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
                buildTheHtmlOutput += '<p class="source-blue">' + value.articleSource + '</p>';
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '<form class="delete-icon-form">';
                buildTheHtmlOutput += '<button class="button-wrapper" type="submit">';
                buildTheHtmlOutput += '<i class="fa fa-times col-1" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '<input type="hidden" class="article-id" value="' + value._id + '">';
                buildTheHtmlOutput += '<input type="hidden" class="article-source" value="' + value.articleSource + '">';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '</li>';
            } else if (value.articleSource === "Fox News" || value.articleSource === "The Wall Street Journal" || value.articleSource === "Financial Post") {
                buildTheHtmlOutput += '<li class="col-12"><div class="article-info col-11"><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
                buildTheHtmlOutput += '<p class="source-red">' + value.articleSource + '</p>';
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '<form class="delete-icon-form">';
                buildTheHtmlOutput += '<button class="button-wrapper" type="submit">';
                buildTheHtmlOutput += '<i class="fa fa-times col-1" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '<input type="hidden" class="article-id" value="' + value._id + '">';
                buildTheHtmlOutput += '<input type="hidden" class="article-source" value="' + value.articleSource + '">';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '</li>';
            } else {
                buildTheHtmlOutput += '<li class="col-12"><div class="article-info col-11"><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
                buildTheHtmlOutput += '<p>' + value.articleSource + '</p>';
                buildTheHtmlOutput += '</div>';
                buildTheHtmlOutput += '<form class="delete-icon-form">';
                buildTheHtmlOutput += '<button class="button-wrapper" type="submit">';
                buildTheHtmlOutput += '<i class="fa fa-times col-1" aria-hidden="true"></i>';
                buildTheHtmlOutput += '</button>';
                buildTheHtmlOutput += '<input type="hidden" class="article-id" value="' + value._id + '">';
                buildTheHtmlOutput += '<input type="hidden" class="article-source" value="' + value.articleSource + '">';
                buildTheHtmlOutput += '</form>';
                buildTheHtmlOutput += '</li>';
            }
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

function refreshNeedle(articles) {
    let totalPoliticalCount = [];
    let needleValue;
    let thisPoliticalCount;
    if (articles.length == 0) {
        needleValue = 0;
    } else {
        $.each(articles, function (index, value) {
            // set totalPoliticalCount
            thisPoliticalCount = value.politicalCount;
            totalPoliticalCount.push(thisPoliticalCount);
        })
        // calculate sum
        function getSum(total, num) {
            return total + num;
        }
        let politicalSum = totalPoliticalCount.reduce(getSum);
        // calculate average
        needleValue = politicalSum / articles.length;
    }
    // set needle
    console.log(needleValue);
    $('.logo .needle').css('transform', 'rotate(' + needleValue + 'deg)');
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
    getHeadlinesBySource("msnbc");
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
    getHeadlinesBySource("msnbc");
    getHeadlinesBySource("politico");
    getHeadlinesBySource("financial-post");
});

// add article to reading list
$(document).on('click', '.add', function (event) {
    let articleTitle = $(this).parent().find('.add-to-reading-list-title').val();
    let articleUrl = $(this).parent().find('.add-to-reading-list-url').val();
    let articleSource = $(this).parent().find('.add-to-reading-list-source').val();
    let politicalCount;
    // assign political count for each article source
    if (articleSource === "The New York Times") {
        politicalCount = -60;
    } else if (articleSource === "USA Today") {
        politicalCount = 0;
    } else if (articleSource === "Fox News") {
        politicalCount = 90;
    } else if (articleSource === "The Washington Post") {
        politicalCount = -30;
    } else if (articleSource === "Reuters") {
        politicalCount = 0;
    } else if (articleSource === "The Wall Street Journal") {
        politicalCount = 60;
    } else if (articleSource === "MSNBC") {
        politicalCount = -90;
    } else if (articleSource === "Politico") {
        politicalCount = -10;
    } else if (articleSource === "Financial Post") {
        politicalCount = 30;
    }
    const newsArticle = {
        'articleTitle': articleTitle,
        'articleUrl': articleUrl,
        'articleSource': articleSource,
        'politicalCount': politicalCount
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
            displayError('Oops...', 'Please try again', 'error');
        });
});

// delete article from reading list
$(document).on('submit', '.delete-icon-form', function (event) {
    event.preventDefault();
    var articleID = $(this).find('.article-id').val();
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
            displayError('Something went wrong');
        });
});


// send reading list email

function buildEmailBodyHtml(articles) {
    if (articles.length !== 0) {
        emailBodyHtml += '<p>Below are your articles from Bias Balanced News:</p>';
        emailBodyHtml += '<br />';
        emailBodyHtml += '<ul>';
        $.each(articles, function (index, value) {
            emailBodyHtml += '<li><a href="' + value.articleUrl + '">' + value.articleTitle + '</a>';
            emailBodyHtml += '<p> From ' + value.articleSource + '</p>';
            emailBodyHtml += '<br />';
            emailBodyHtml += '</li>';
        });
        emailBodyHtml += '</ul>';
        emailBodyHtml += '<p>For more headlines, check out Bias Balanced News at https://bias-balanced-news.herokuapp.com/.</p>';

    }
}

function buildEmailBodyText(articles) {
    if (articles.length !== 0) {
        emailBodyText += 'Below are your articles from Bias Balanced News:';
        $.each(articles, function (index, value) {
            emailBodyText += value.articleTitle;
            emailBodyText += value.articleSource;
            emailBodyText += value.articleUrl;
        });
        emailBodyText += 'For more headlines, check out Bias Balanced News at https://bias-balanced-news.herokuapp.com/.';
    }
}

$(".news .reading-list-sidebar form").on('submit', function (event) {
    event.preventDefault();
    var emailAddress = $('#email').val();
    if (emailAddress.length === 0) {
        displayError('Please enter an email address');
    } else {
        var emailObject = {
            emailBody: emailBodyText,
            emailHtml: emailBodyHtml,
            emailAddress: emailAddress
        }
        $.ajax({
                type: "POST",
                url: '/send-email/',
                dataType: 'json',
                data: JSON.stringify(emailObject),
                contentType: 'application/json'
            })
            // if API call successful
            .done(function (result) {
                displayError('Email Sent');
                emailAddress = "";
                $("#email").val("");
            })
            // if API call unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // return errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                displayError('Something went wrong');
            });
    }
});

$(".reading-list-full-page form").on('submit', function (event) {
    event.preventDefault();
    console.log("test");
    var emailAddress = $('#full-page-list-email').val();
    if (emailAddress.length === 0) {
        displayError('Please enter an email address');
    } else {
        var emailObject = {
            emailBody: emailBodyText,
            emailHtml: emailBodyHtml,
            emailAddress: emailAddress
        }
        $.ajax({
                type: "POST",
                url: '/send-email/',
                dataType: 'json',
                data: JSON.stringify(emailObject),
                contentType: 'application/json'
            })
            // if API call successful
            .done(function (result) {
                displayError('Email Sent');
                emailAddress = "";
                $("#full-page-list-email").val("");
            })
            // if API call unsuccessful
            .fail(function (jqXHR, error, errorThrown) {
                // return errors
                console.log(jqXHR);
                console.log(error);
                console.log(errorThrown);
                displayError('Something went wrong');
            });
    }
});
