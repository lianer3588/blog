window.onload=function(){
    if(location.search.indexOf("bid")!=-1) {
        var bid = location.search.split("=")[1];
        ajax({
            url: "http://127.0.0.1:2000/details/getDetails?bid="+bid,
            type: "get",
            dataType: "json"//ajax���Զ���jsonתΪobj
        })//return promise
            //    open(res)
        .then(function (res) {
                console.log(res);
                console.log(1);
                var {name,content,createtime}=res[0];
                var html = `<p>${content}</p>`;

                var divCard = document.querySelector(".main-content");
                console.log(divCard);
                divCard.innerHTML = html;
        })

        function loadPage(){
            $.ajax({
                url:"http://localhost:2000/blog_show",
                type:"get",
                dataType:"json",
                success:function(output){
                    //console.log(output);
                    var {blog, blog_info,blog_kind}=output;
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
                }
            })
        }
        loadPage();
    }
}
