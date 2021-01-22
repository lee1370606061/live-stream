$(document).ready(function(e) {
    var width = window.innerWidth
    window.addEventListener('scroll', function() {
        var scrollTop = $(document).scrollTop()
        if (scrollTop < 300) {
            $("#returnTop").hide()
        } else {
            $("#returnTop").show()
        }
    })


    //手机版
    if (width <= 600) {
        $('header a img').css('padding-left', '.5rem')

        $('body').css('margin-bottom', '80px')

        $('main').removeClass('mt-4')
        $('main').addClass('mt-1')

        $('.is-mobile a button span').each((key, element) => {
            $(element).empty()
        });

        $('.is-mobile .isHot').each((key, element) => {
            $(element).hide()
        });

        $('.is-mobile li').each((key, element) => {
            $(element).css('padding', '.5rem .2rem')
        });

        $('.is-mobile .matchType').each((key, element) => {
            $(element).hide()
        });

        $('.is-mobile .teamOne').each((key, element) => {
            var html = $(element).html()
            if (html.length > 4) {
                $(element).html(html.substr(0, 4) + '...')
            }
        });

        $('.is-mobile .teamTwo').each((key, element) => {
            var html = $(element).html()
            if (html.length > 4) {
                $(element).html(html.substr(0, 4) + '...')
            }
        });

        $('.right-banner').hide()
        $('.imgOne').hide()
        $('.imgTwo').hide()
        $('#video').css('height', '200px')

        $('.left-banner').removeClass('me-3')
    } else {
        $('.bottom-download').remove()
    }
});

function returnTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function gotoDownload(url) {
    console.log(e)
        // location.href = url
}

function onChange(type) {
    $('.change-type').each((key, element) => {
        if (type == 'all') {
            $(element).show()
            $(element).addClass('d-flex')
        }

        if (type == 'hot') {
            if ($(element)[0].attributes.hot.value == 'true') {
                $(element).show()
                $(element).addClass('d-flex')
            } else {
                $(element).hide()
                $(element).removeClass('d-flex')
            }
        }

        if (type == 'basketball') {
            if ($(element)[0].attributes.basketball.value == 'true') {
                $(element).show()
                $(element).addClass('d-flex')
            } else {
                $(element).hide()
                $(element).removeClass('d-flex')
            }
        }

        if (type == 'football') {
            if ($(element)[0].attributes.football.value == 'true') {
                $(element).show()
                $(element).addClass('d-flex')
            } else {
                $(element).hide()
                $(element).removeClass('d-flex')
            }
        }
    })
}