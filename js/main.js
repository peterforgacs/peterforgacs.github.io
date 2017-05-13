if (!!$.prototype.justifiedGallery) { // if justifiedGallery method is defined
    var options = {
        rowHeight: 140,
        margins: 4,
        lastRow: 'justify'
    };
    $('.article-gallery').justifiedGallery(options);
}

  /*******************************************************************************
   Left and right arrow for previous and next article
  ********************************************************************************/
$(document).keydown(function(e) {
    let domain = window.location.host;
    let next = $('#next-post').attr('href');
    let previous = $('#previous-post').attr('href');

    switch (e.keyCode) {
        case 39:
            if (next) window.location.href = `http://${domain}${next}`;
            break;
        case 37:
            if (previous) window.location.href = `http://${domain}${previous}`;
            break;
        default:
            break;
    }
});

$(document).ready(function() {
    /*******************************************************************************
     Allways show topics on dekstop
    ********************************************************************************/
    $('#menu').css('visibility', 'visible');
    $('#menu-icon').addClass('active');
    $("#menu > #nav").show();

    $("#menu-icon, #menu-icon-tablet").click(function() {
        if ($('#menu').css('visibility') == 'hidden') {
            $('#menu').css('visibility', 'visible');
            $('#menu-icon, #menu-icon-tablet').addClass('active');

            var topDistance = $("#menu > #nav").offset().top;

            if ($('#menu').css('visibility') != 'hidden' && topDistance < 50) {
                $("#menu > #nav").show();
            } else if ($('#menu').css('visibility') != 'hidden' && topDistance > 100) {
                $("#menu > #nav").hide();
            }
            return false;
        } else {
            $('#menu').css('visibility', 'hidden');
            $('#menu-icon, #menu-icon-tablet').removeClass('active');
            return false;
        }
    });

    /* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
    $("#header > #nav > ul > .icon").click(function() {
        $("#header > #nav > ul").toggleClass("responsive");
    });

    if ($("#menu").length) {
        $(window).on('scroll', function() {
            var topDistance = $("#menu > #nav").offset().top;

            if ($('#menu').css('visibility') != 'hidden' && topDistance < 50) {
                $("#menu > #nav").show();
            } else if ($('#menu').css('visibility') != 'hidden' && topDistance > 100) {
                $("#menu > #nav").hide();
            }

            if (!$("#menu-icon").is(":visible") && topDistance < 50) {
                $("#menu-icon-tablet").show();
                $("#top-icon-tablet").hide();
            } else if (!$("#menu-icon").is(":visible") && topDistance > 100) {
                $("#menu-icon-tablet").hide();
                $("#top-icon-tablet").show();
            }
        });
    }

    if ($("#footer-post").length) {
        var lastScrollTop = 0;
        $(window).on('scroll', function() {
            var topDistance = $(window).scrollTop();

            if (topDistance > lastScrollTop) {
                // downscroll code
                $("#footer-post").hide();
            } else {
                // upscroll code
                $("#footer-post").show();
            }
            lastScrollTop = topDistance;

            $("#nav-footer").hide();
            $("#toc-footer").hide();
            $("#share-footer").hide();

            if (topDistance < 50) {
                $("#actions-footer > ul > #top").hide();
                $("#actions-footer > ul > #menu").show();
            } else if (topDistance > 100) {
                $("#actions-footer > ul > #menu").hide();
                $("#actions-footer > ul > #top").show();
            }
        });

        /*******************************************************************************
         Estamed read time
         Read time is based on the average reading speed of an adult (roughly 275 WPM).
         We take the total word count of a post and translate it into minutes.
        ********************************************************************************/
        const wordsPerMinute = 275;
        let numberOfWords = document.body.innerText.split(/\s/).filter(function(txt) { return /\S/.test(txt) }).length;
        let readTime = Math.ceil(numberOfWords / wordsPerMinute);
        document.getElementsByClassName('readTime')[0].innerText = `| ${readTime} minute read`;

    }
});

/*******************************************************************************
 If 404 redirect to main page
********************************************************************************/

'use strict';
if (document.title === "404") {
    var redirect = setTimeout(function() {
        window.location.replace(`http://${window.location.hostname}`);
    }, 10000);
}