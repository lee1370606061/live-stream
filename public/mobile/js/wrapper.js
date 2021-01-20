//监听拖动区域高度变化，重新获取高度
var old_p_length = 0;

function li_p_length() {
    var p_length = $(".j_scroller li p").length;
    if (p_length != old_p_length) {
        bb();
        old_p_length = p_length;
    }
}
var is_dong = false;
// 统计滑动

function bb() {
    if (!is_dong) {
        is_dong = true;
        if ($(".j_wrapper").length > 0) {
            var c = $(".j_wrapper").length;
            $(".j_wrapper").each(function(n, item) {
                var i = $(this),
                    f = i.find(".j_scroller"),
                    k = f.find("li"),
                    h = k.length * k.width(),
                    g = k.height(),
                    e = i.parent().find(".btn_l"),
                    j = i.parent().find(".btn_r");
                if (k.length > 4) {
                    //                  i.attr("id", "wrapper" + new Date().getTime());
                    k.css("width", k.width());
                    //                  f.css("width", h).css("height", g);
                    f.css("width", h);
                    //                  i.css("height", g);
                    e.on("click", function() {
                        var scrollSize = k.width();
                        var currLeft = i.scrollLeft();
                        currLeft = currLeft - currLeft % scrollSize - scrollSize;
                        i.animate({
                            scrollLeft: currLeft + "px"
                        }, "slow");
                    });
                    j.on("click", function() {
                        var scrollSize = k.width();
                        var currLeft = i.scrollLeft();
                        currLeft = currLeft - currLeft % scrollSize + scrollSize;
                        i.animate({
                            scrollLeft: currLeft + "px"
                        }, "slow");
                    });
                }
            })
            is_dong = false;
        }
    }

}