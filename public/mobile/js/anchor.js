$(document).ready(function() {
    report.init()
})
var report = {
    init: function() {
        this.anchorPort()
    },
    anchorPort() {
        $.ajax({
            type: "GET",
            contentType: "application/json",
            dataType: "jsonp",
            url: "https://app.leqiuba.cc/room/getRoomStatus.php",
            success: function(res) {
                var data = res
                if (JSON.stringify(res) == "{}" || res.length == 0 || res == undefined || res == null) {
                    $('.bigBox').html('<img style="width: 130px;height: auto;" src="/leqiuba_app/Public/Wap/img/wushuju.png" /><p style="color: #6FD1FF;">暂无主播</p>')
                    $('.bigBox').css('text-align', 'center')
                    $('.theEnd').css('display', 'none')
                } else {
                    sessionStorage.setItem("data", JSON.stringify(data))
                    var list = ""
                    for (var key in data) {
                        var item = [data[key]]
                        item.forEach(element => {
                            var url = "/data/anchor_detail.html" + '?id=' + element.id
                            var div = '<a href="' + url + '"><div class="anchorBox"><div><img src="' + element.image + '" /><p>直播中</p></div><p>' + element.title + '</p></div></a>'
                            list += div
                        })
                    }
                    $(".bigBox").html(list)
                }

            },
            error: function(err) {
                console.log(err);
                $('.bigBox').html('<img style="width: 130px;height: auto;" src="/leqiuba_app/Public/Wap/img/wushuju.png" /><p style="color: #6FD1FF;">暂无主播</p>')
                $('.bigBox').css('text-align', 'center')
                $('.theEnd').css('display', 'none')
            }
        })
    }
}