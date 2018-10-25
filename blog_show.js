window.onload=function(){
    if(location.search.indexOf("kinds=")!=-1){
        var kinds=decodeURI(
            location.search.split("=")[1]);
        function loadPage(){
            $.ajax({
                url:"http://localhost:2000/blog_show",
                type:"get",
                data:{kinds},
                dataType:"json",
                success:function(output){
                    //console.log(output);
                    var {blog, blog_info,blog_kind}=output;
                    var html="";
                    var html1=``;
                    var html2=``;

                    for(var key of blog){
                        var {title}=key;
                        html1 +=`<li>${title}</li>` ;
                    }

                    var blogName=document.querySelector("#blog-news>ul:last-child");
                    console.log(blogName);
                    blogName.innerHTML +=html1;

                    for(var key of blog_kind){
                        html2 +=`<li>${key.kind_name}</li>` ;

                    }

                    var blogTag=document.querySelector("#blog-news>ul:nth-child(2)");
                    console.log(blogTag);
                    blogTag.innerHTML +=html2;

                    for(var p of blog_info){
                        var {title,createtime,general,href}=p;
                        html+=`
                        <div class="day">
                            <div class="dayTitle">
                                <a id="ImageLink" href="#">置顶随笔</a>
                            </div>
                            <div class="postTitle">
                                <a id="TitleUrl_0" class="postTitle2" href="${href}">${title}</a>
                            </div>
                            <div class="postCon">
                                <div class="c_desc">
                                    摘要:
                                    <img class="desc_img" src="images/logo/8.jpg">
                                    ${general}
                                    <a href="${href}" class="c_desc_readmore">阅读全文</a>
                                </div>
                            </div>
                            <div class="clear"></div>
                            <div class="postDesc">
                                posted @ ${createtime} lianer 阅读(51982) 评论(74)  <a href="#" rel="nofollow">编辑</a>
                            </div>
                            <div class="clear"></div>
                        </div>`;
                    }
                    var divList=document.querySelector("div.main-content");
                    console.log(divList);
                    divList.innerHTML +=html;

                }
            })
        }
        loadPage();
    }


}