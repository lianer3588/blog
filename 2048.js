/**
 * Created by CHENLIAN on 2017/7/7.
 */
//��������
//+function(){}();
//(function(){})();


    /*
     * ��������data
     * ������������RN��CN
     * ����һ��������
     * ����������飬��R��ʼ����RN����
     * ѹ��һ��������
     * ��C��ʼ����CN����
     * ��data��ѹ��һ��0
     * �ֶ�����data.join("\n");
     * */
    var data = null;
    var RN = 4, CN = 4;
    var score=0;//�÷�
    status=0,GAMEOVER=0,RUNNING=1;
    function start() {
        //����Ϸ״̬����Ϊ�����У�
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

            //�����λ�ò��� data[r][c].MAth.random()*RN;
            var r = parseInt(Math.random() * RN);
            var c = parseInt(Math.random() * CN);
            //�������2��4
            if (data[r][c] == 0) {
                data[r][c] = Math.random() > 0.5 ? "2" : "4";
                break;
            }
            //console.log(r,c);
        }
    }
    //ˢ��ҳ��
    function updateView(){
            //����data
            //��id���Ҷ�Ӧ��div var div=document.getElementById("c"+r+c);
            //divID.className="";div.className="n"+data[r][c];
            //����div
            //���r��c��Ϊ�㣬���div������� var r="";(���ַ���)
            //����͵���data[r][c];
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
        //���ƺ������
        //var after=String(data);
        //if(before!=after){
        //
        //}
    }
    //��������һ��
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
        //nextc��c+1����CN-1������
        //���r��c�е�λ�ò�Ϊ�㣬
        //�ͷ��ظ�nextc
        for(var nextc=c+1;nextc<=CN-1;nextc++){
            if(data[r][nextc]!=0){
                return nextc;
            }
        }
        return -1;
    }

    //����
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

    //����
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
        //���ƺ������
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

    //����

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

    //�ж���Ϸ����
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
