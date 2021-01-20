function p(s) {
    return s < 10 ? '0' + s : s;
}

function now_time() {
    var myDate = new Date();
    var year = myDate.getFullYear()
    var month = myDate.getMonth() + 1;
    var date = myDate.getDate();
    var h = myDate.getHours();
    var m = myDate.getMinutes();

    var now = p(year) + "-" + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m);
    return now;
}

$(document).ready(up_soure);

var int = self.setInterval(up_soure, 10000);


function up_soure() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "jsonp",
        url: "https://h5.leqiuba.cc/app/getScore.php",
        success: function(res) {
            sessionStorage.setItem("res", JSON.stringify(res.data))
        }
    })
    setTimeout(function() {
        var s = JSON.parse(sessionStorage.getItem('res'))
        var div = $('.match > a');
        div.each(function(i, v) {
            var timer = $(this).attr('s')
            var status = $(this).attr('status');
            var ul = $(this).attr('key');
            if (timer <= now_time() && status != '1') {
                var ul = $(this).attr('key');
                if (Object.keys(s).length != 0) {
                    for (var i = 0; i < s.length; i++) {
                        if (ul == s[i].id) {
                            $(this).children('.list').children('.score').children('.score_num').text(s[i].home_score + '-' + s[i].visit_score);
                            break;
                        } else {
                            $(this).children('.list').children('.score').children('.score_num').text('-');
                        }
                    }
                } else {
                    $(this).children('.list').children('.score').children('.score_num').text('-');
                }
                var img = '<img src="/skin/picture/video2.png" />'
                $(this).children('.list').children('.imgzhibo').html(img)
                $(this).children('.list').children('.score').children('.state').text('直播中')
                $(this).children('.list').children('.score').children('.state').css("color", "#D20000")
            }
        })
    }, 200)
}