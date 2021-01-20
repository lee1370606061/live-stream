$(document).ready(function() {
    historyChat()
})

var width = $(document).width()
var wxBanner = ''
if (width == 360) {
    wxBanner = 103
}
if (width == 411) {
    wxBanner = 117
}
if (width == 320) {
    wxBanner = 91.3
}
if (width == 375) {
    wxBanner = 107
}
if (width == 414) {
    wxBanner = 118.1
}
if (width == 768) {
    wxBanner = 219
}
if (width == 1024) {
    wxBanner = 292
}



var otherHeight = $('#header').height() + wxBanner + $('.dataMsg').height() + $('#nav').height() + $('#userLt').height()
var screenHeight = $(document).height()
$('.contentList').height(screenHeight - otherHeight)


// 历史消息
function historyChat() {
    $.ajax({
        url: 'https://im.leqiuba.com/history/history.php',
        type: 'post',
        data: {
            room_id: $('#room_id').val(),
            c: 'p'
        },
        success: function(res) {
            var res = JSON.parse(res)
            if (res.errcode == 0) {
                var data = res.data
                $('.lt_num span').text(res.data.room.Count)
                sessionStorage.setItem('online_num', res.data.room.Count)
                var arr = data.history
                var list = ''
                arr.forEach(function(element) {
                    var div = '<p class="chatList"><a style="color: #216DD5;">' +
                        element.nickname + '</a>：' +
                        element.content + '</p>'

                    list += div
                });

                $('.contentList').append(list)
                $(".contentList").scrollTop($(".contentList")[0].scrollHeight)
            } else {
                console.log(res.errmsg)
            }

        },
        error: function(err) {
            console.log(err)
        }
    })
}

//发送消息
function sendMsg() {
    $('#toApp').show()
    $('#mengban').show()
}