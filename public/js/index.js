$(document).ready(function(e) {
    window.addEventListener('scroll', function() {
        var scrollTop = $(document).scrollTop()
        if (scrollTop < 300) {
            $("#returnTop").hide()
        } else {
            $("#returnTop").show()
        }
    })
});

function returnTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

function onChange($this, type) {

    var active = {
        all: '/images/all-active.png',
        hot: '/images/remen-active.png',
        football: '/images/zuqiu.png',
        basketball: '/images/lanqiu-active.png',
    }

    var inActive = {
        all: '/images/all-inactive.png',
        hot: '/images/remen-inactive.png',
        football: '/images/zuqiu.png',
        basketball: '/images/lanqiu-inactive.png',
    }

    $($this.parentNode).find('img').each(function(key, element) {
        $(element).attr('src', inActive[element.attributes.data.value])
    })

    $($this).find('img').attr('src', active[type])



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