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