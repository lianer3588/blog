/**
 * Created by CHENLIAN on 2018/9/13.
 */

$( function() {
    var tops = $(".main").offset().top;
    $(window).scroll(function () {
        var scrolltop = $(window).scrollTop();
        if (scrolltop > tops) {
            $(".main").css({
                "position": "fixed",
                "top": 0,
                "left": 0
            });
        } else {
            $(".main").css({
                "position": "absolute",
                "top":tops,
                "left": 0
            })
        }
    });
//        菜单页的边框效果
    $(".nav-right>ul>li:last-child").css("border","1px solid #ffe600");
    $(".nav-right>ul").on("click","li", function (e) {
        //e.preventDefault();
        var $li=$(this);
           $li.css("border","1px solid #ffe600")
            .siblings("li").css("border","")
    })
});
