/**
 * Created by CHENLIAN on 2017/7/7.
 */
//匿名函数
//+function(){}();
//(function(){})();


    /*
     * 定义数组data
     * 声明两个变量RN，CN
     * 创建一个空数组
     * 遍历这个数组，从R开始，到RN结束
     * 压入一个空数组
     * 从C开始，到CN结束
     * 向data中压入一个0
     * 手动输入data.join("\n");
     * */
    var data = null;
    var RN = 4, CN = 4;
    var score=0;//得分
    status=0,GAMEOVER=0,RUNNING=1;
    function start() {
        //把游戏状态设置为运行中；
        status=RUNNING;
        score=0;
        data = [];
        for (var r = 0; r < RN; r++) {
            data.push([]);
            for (var c = 0; c < CN; c++) {
                data[r].push(0);
            }
        }
        randomNum();
        randomNum();
        updateView();
        console.log(data.join("\n"));
        document.onkeydown=function(e){
            console.log(e.keyCode);
            switch (e.keyCode){
                case 37:
                    moveLeft();
                    break;
                case 38:
                    moveUp();
                    break;
                case 39:
                    moveRight();
                    break;
                case 40:
                    moveDown();
                    break;

            }
        }
    }

    function randomNum() {
        while (true) {

            //在随机位置产生 data[r][c].MAth.random()*RN;
            var r = parseInt(Math.random() * RN);
            var c = parseInt(Math.random() * CN);
            //随机生成2和4
            if (data[r][c] == 0) {
                data[r][c] = Math.random() > 0.5 ? "2" : "4";
                break;
            }
            //console.log(r,c);
        }
    }
    //刷新页面
    function updateView(){
            //遍历data
            //用id查找对应的div var div=document.getElementById("c"+r+c);
            //divID.className="";div.className="n"+data[r][c];
            //设置div
            //如果r行c列为零，则把div内容清除 var r="";(空字符串)
            //否则就等于data[r][c];
            for(var r=0;r<RN;r++){
                for(var c=0;c<CN;c++){
                    var divID=document.getElementById("c"+r+c);
                    if(data[r][c]==0){
                        divID.innerHTML="";
                        divID.className="";
                    }else{
                        divID.innerHTML=data[r][c];
                        divID.className="n"+data[r][c];
                    }
                }
            }
            document.getElementById("scoreNum").innerHTML=score;
            var gameOverDiv=document.getElementById("gameOver");
            var scoreSpan=document.getElementById("final");
            if(status==GAMEOVER){
                    gameOverDiv.style.display="block";
                    scoreSpan.innerHTML=score;
                }else{
                gameOverDiv.style.display="none";
            }
        }
    function moveLeft(){
        //var before=String(data);
        for(var r=0;r<RN;r++){
            moveLeftInRow(r);
        }
        randomNum();
        if(isGameOver()){
            status=GAMEOVER;
        };
        updateView();
        //左移后的样子
        //var after=String(data);
        //if(before!=after){
        //
        //}
    }
    //行内左移一行
    function moveLeftInRow(r){
        for(var c=0;c<CN-1;c++){
            var nextc=getNextInRow(r,c);
            if(nextc !=-1){
                if(data[r][c]==0){
                    console.log(1);
                    data[r][c]= data[r][nextc];
                    data[r][nextc]=0;
                    c--;
                }else if(data[r][c]==data[r][nextc]){
                    console.log(2);
                    data[r][c]= data[r][c]*2;
                    score+=data[r][c];
                    data[r][nextc]=0;
                }
            }else if(nextc==-1){break;}
        }
    }
    function getNextInRow(r,c){
        //nextc从c+1，到CN-1结束；
        //如果r行c列的位置不为零，
        //就返回给nextc
        for(var nextc=c+1;nextc<=CN-1;nextc++){
            if(data[r][nextc]!=0){
                return nextc;
            }
        }
        return -1;
    }

    //右移
    function moveRight(){
        //var before=String(data);
        for(var r=0;r<RN;r++){
            moveRightInRow(r);
        }
        randomNum();
        if(isGameOver()){
            status=GAMEOVER;
        };

        updateView();
        //var after=String(data);
        //if(before!=after){
        //
        //}
    };
    function moveRightInRow(r){
        for(var c=CN-1;c>0;c--){
            var prec=getPreInRow(r,c);
            if(prec !=-1){
                if(data[r][c]==0){
                    console.log(1);
                    data[r][c]= data[r][prec];
                    data[r][prec]=0;
                    c++;
                }else if(data[r][c]==data[r][prec]){
                    console.log(2);
                    data[r][c]= data[r][c]*2;
                    score+=data[r][c];
                    data[r][prec]=0;
                }
            }else if(prec==-1){break;}
        }
    };
    function getPreInRow(r,c){
        for(var prec=c-1;prec>=0;prec--){
            if(data[r][prec]!=0){
                return prec;
            }
        }
        return -1;
    };

    //上移
    function moveUp(){
        //var before=String(data);
        for(var c=0;c<CN;c++){
            moveUpInCol(c);
        }
        randomNum();
        if(isGameOver()){
            status=GAMEOVER;
        };

        updateView();
        //左移后的样子
        //var after=String(data);
        //if(before!=after){
        //
        //}
    };
    function moveUpInCol(c){
        for(var r=0;r<RN-1;r++){
            var nextr=getNextCol(r,c);
            if(nextr !=-1){
                if(data[r][c]==0){
                    console.log(1);
                    data[r][c]= data[nextr][c];
                    data[nextr][c]=0;
                    r--;
                }else if(data[r][c]==data[nextr][c]){
                    console.log(2);
                    data[r][c]= data[r][c]*2;
                    score+=data[r][c];
                    data[nextr][c]=0;
                }
            }else if(nextr==-1){break;}
        }
    };
    function getNextCol(r,c){
        for(var nextr=r+1;nextr<=RN-1;nextr++){
            if(data[nextr][c]!=0){
                return nextr;
            }
        }
        return -1;
    };

    //下移

    function moveDown(){
        //var before=String(data);
        for(var c=0;c<CN;c++){
            moveDownInCol(c);
        }
        randomNum();
        if(isGameOver()){
            status=GAMEOVER;
        };
        updateView();
        //var after=String(data);
        //if(before!=after){
        //
        //}
    };
    function moveDownInCol(c){
        for(var r=RN-1;r>0;r--){
            var prer=getPreCol(r,c);
            if(prer !=-1){
                if(data[r][c]==0){
                    console.log(1);
                    data[r][c]= data[prer][c];
                    data[prer][c]=0;
                    r++;
                }else if(data[r][c]==data[prer][c]){
                    console.log(2);
                    data[r][c]= data[r][c]*2;
                    score+=data[r][c];
                    data[prer][c]=0;
                }
            }else if(prer==-1){break;}
        }
    };
    function getPreCol(r,c){
        for(var prer=r-1;prer>=0;prer--){
            if(data[prer][c]!=0){
                return prer;
            }
        }
        return -1;
    };

    //判断游戏结束
    function isGameOver(){
        for(var r=0;r<RN;r++){
            for(var c=0;c<CN;c++){
                if(data[r][c]==0){
                    return false;
                }
                if(c<CN-1 && data[r][c]==data[r][c+1]){
                    return false;
                }
                if(r<RN-1 && data[r][c]==data[r+1][c]){
                    return false;
                }
            }
        }
        return true;

    }

    start();
