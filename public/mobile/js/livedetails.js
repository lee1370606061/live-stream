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

/*var matchTimer = $('.matchTimer').text()

if(matchTimer>=now_time()){
	$('.state').text('视频直播')
	$('.state').css('background','#D20000')
}*/


$(document).ready(setTimeout(up_soure, 200));
$(document).ready(setTimeout(tab_z, 200));
var int = self.setInterval(up_soure, 10000);
var ta = self.setInterval(tab_z, 10000);

function tab_z() {
    var matchTimer = $('._t').text()
    var status = $('.list').attr('status')
    var online_num = sessionStorage.getItem('online_num')
    if (matchTimer <= now_time() && status != 1) {
        var type = $('.list').attr('match')
        var lt = ' <div class="swiper-slide navNow lt_num" key="lt" style="width: 25%" onclick="checked(this)">聊天(<span>' + online_num + '</span>)</div>'
        var html = '';
        if (type != '') {
            if (type == 2) {
                html = lt + '<div class="swiper-slide" key="ssgk" style="width: 25%" onclick="checked(this)">实时赛况</div>' +
                    '<div class="swiper-slide" style="width: 25%" key="jstj" onclick="checked(this)">技术统计</div>' +
                    '<div class="swiper-slide" style="width: 25%" key="bszr" onclick="checked(this)">比赛阵容</div>' +
                    '<div class="swiper-slide" style="width: 25%" key="jfls" onclick="checked(this)">赛前分析</div>';
                $('#checked-lt').css('display', 'block');
            } else if (type == 1) {
                html = lt + '<div class="swiper-slide" style="width: 25%" key="qdtj" onclick="checked(this)">球队统计</div>' +
                    '<div class="swiper-slide" key="qytj" style="width: 25%" onclick="checked(this)">球员统计</div>' +
                    '<div class="swiper-slide" key="jfls" style="width: 25%" onclick="checked(this)">交锋历史</div>';
                $('#checked-lt').css('display', 'block');
            }
            $('#checked-lt').css('display', 'block');
            $('.swiper-wrapper').html(html);
            clearInterval(ta);
        }
    }
}


function up_soure() {
    var matchTimer = $('._t').text()
    var status = $('.list').attr('status')
    var score_id = $('.list').attr('score_id')
    if (matchTimer <= now_time() && status != 1) {
        var type = $('.list').attr('match')
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "jsonp",
            url: "https://h5.leqiuba.cc/app/getScore.php",
            success: function(json) {
                $.each(json.data, function(i, v) {
                    if (score_id == v.id) {
                        $('.score_id').text(v.home_score + '-' + v.visit_score)
                        return false;
                    } else {
                        $('.score_id').text('-')
                    }
                })
            }
        })
        $('.state').text('视频直播')
        $('.state').css('background', '#D20000')
    }
}