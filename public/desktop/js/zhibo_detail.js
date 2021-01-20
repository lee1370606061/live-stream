// 判断比赛状态
function p(s) {
    return s < 10 ? '0' + s : s;
}
//当前时间
function time_now() {
    var myDate = new Date();
    var year = myDate.getFullYear()
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours(); //获取当前小时数(0-23)
    var m = myDate.getMinutes(); //获取当前分钟数(0-59)

    var now = p(year) + "-" + p(month) + "-" + p(date) + " " + p(h) + ':' + p(m);
    return now
}

window.onload = setTimeout(detail_soucer, 100);

window.onload = setTimeout(tab_z, 100);
// $(document).ready(detail_soucer());

var inti = self.setInterval(detail_soucer, 10000);
var ta = self.setInterval(tab_z, 10000);


function tab_z() {
    var ul = $('.msg > ul');
    var time = $('._t').text();
    var key = ul.attr('score_id');
    var status = ul.attr('status');
    if (time <= time_now() && status != 1) {
        var type = ul.attr('match')
        var html = '';
        if (type != '') {
            if (type == 2) {
                html = '<li  key="ssgk" class="surveyActive" onclick="survey(this)">实时赛况</li>' +
                    '<li  key="jxtj" onclick="survey(this)">技术统计</li>' +
                    '<li  key="bszr" onclick="survey(this)">比赛阵容</li>' +
                    '<li  key="sqfx"  onclick="survey(this)">赛前分析</li>';
                $('#survey-ssgk').css('display', 'block');
                $('#survey-sqfx').css('display', 'none');
            } else if (type == 1) {
                html = '<li  key="qdtj" class="surveyActive" onclick="survey(this)">球队统计</li>' +
                    '<li  key="qytj" onclick="survey(this)">球员统计</li>' +
                    '<li  key="jfls" onclick="survey(this)">交锋历史</li>';
                $('#survey-qdtj').css('display', 'block');
                $('#survey-jfls').css('display', 'none');
            }
            $('#tab_z').html(html);
            clearInterval(ta);
        }
    }
}

function detail_soucer() {
    var ul = $('.msg > ul');
    var time = $('._t').text();
    var key = ul.attr('score_id');
    var status = ul.attr('status');
    if (time <= time_now() && status != 1) {
        var type = ul.attr('match')
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "jsonp",
            url: "https://h5.leqiuba.cc/app/getScore.php",
            success: function(json) {
                $.each(json.data, function(i, v) {
                    if (key == v.id) {
                        ul.children('.home').text(v.home_score)
                        ul.children('.visit').text(v.visit_score)
                        return false
                    } else {
                        ul.children('.home').text('-')
                        ul.children('.visit').text('-')
                    }
                })
                var img = $('.msg').children('.state').children('img').attr('src');
                var html = '<img src="' + img + '" />直播中'
                $('.msg').children('.state').html(html)
                $('.msg').children('.state').css("background", "red")
            }
        })
    }
}