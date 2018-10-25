/**
 * Created by CHENLIAN on 2018/10/20.
 */
$(function(){
    //1. 动态创建link引用header.css
    $("<link rel='stylesheet' href='../css/header.css'>").appendTo("head")
    //2. ajax请求header.html片段
    $.ajax({
        url:"http://127.0.0.1:2000/header.html",
        type:"get",
        success:function(res){
            $("#header").replaceWith(res)
            var $ul=$("div.banner>ul")
            $ul.on("click","a",function(e){
                //  3. 查找要修改的元素
                //  4. 修改元素
                e.preventDefault();
                var $tag=$(this);
                var kw=$tag.text();
                if(kw!=="")
                    location.href=
                        `blog_show.html?kinds=${kw}`;
            });
            var $input=$("#search");
            var $btnSearch=$input.parent().next().children();
            $btnSearch.click(function(){
                var kw=$input.val().trim();
                if(kw!=="")
                    location.href=
                        `blog_show.html?kinds=${kw}`;
            })
                $input.keyup(function(e){
                    if(e.keyCode==13) $btnSearch.click()
                })

            if(location.search.indexOf("kinds")!=-1){
                var kinds=decodeURI(
                    location.search.split("=")[1]
                )
                $input.val(kinds)
            }
        }
    })
})