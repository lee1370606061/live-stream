// 判断比赛状态
function p(s) {
    return s < 10 ? '0' + s : s;
}

//当前时间
function now_time() {
    var myDate = new Date();
    var year = myDate.getFullYear()
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)

    var now = p(year) + "-" + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m);
    return now;
}

//console.log(now_time());

$(document).ready(up_sorce());

var int = self.setInterval(up_sorce, 10000);

//更新比分
function up_sorce() {

    $.ajax({
        type: "GET",
        contentType: "application/json",
        dataType: "jsonp",
        url: "https://h5.leqiuba.cc/app/getScore.php",
        success: function(res) {
            sessionStorage.setItem("res", JSON.stringify(res.data))
        }
    })

    var time = self.setTimeout(function() {
        var s = JSON.parse(sessionStorage.getItem('res'))
        var div = $('.contenTab > .listBox');
        div.each(function(i, v) {
            var teim = $(this).attr('s')
            var status = $(this).attr('status');
            var ul = $(this).attr('key');
            if (teim <= now_time() && status != '1') {
                if (Object.keys(s).length != 0) {
                    for (var i = 0; i < s.length; i++) {
                        if (ul == s[i].id) {
                            $(this).children('.myList').children('.team').children('.score').text(s[i].home_score + ' - ' + s[i].visit_score);
                            break;
                        } else {
                            $(this).children('.myList').children('.team').children('.score').text('VS');
                        }
                    }
                } else {
                    $(this).children('.myList').children('.team').children('.score').text('VS');
                }
                var img = $(this).children('.download').children('.status').children('a').children('p').children('img').attr('src');
                var html = '<img src="' + img + '" />视频直播'
                $(this).children('.download').children('.status').children('a').children('p').html(html);
                $(this).children('.download').children('.status').children('a').children('p').removeClass('notBegin')
                return
            }
        })
    }, 200)

}