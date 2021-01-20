var mytime
var y

window.onscroll = function() {
    var scrollTop = $(document).scrollTop()
    if (scrollTop < 300) {
        $("#returnTop").css("display", "none")
    } else {
        $("#returnTop").css("display", "block")
    }
}


function returnTop() {
    y = window.scrollY;
    mytime = setInterval(topy, 10);
}

function topy() {
    if (window.scrollY == 0 || window.scrollY > y) {
        clearInterval(mytime)
    } else {
        window.scrollTo(0, window.scrollY - 500);
        y = window.scrollY;
    }
}