$(function(){
    var wolfTimer;
var time;
    //监控游戏规则的点击事件
      $(".rules").click(function(){
           $(".rule").stop().fadeIn(500);
      });
      //监控游戏规则的关闭按钮
      $(".rule>button").click(function(){
            $(".rule").stop().fadeOut(500);
      });
    // 进度条的实现
   $(".container>.start").click(function(){
       //调用处理进度条的方法
       progressHadler();
       $(".start").stop().fadeOut(500);
       //调用处理随机灰太狼动画的方法
       startWolfAnimation();

   });
   $(".mask>button").click(function(){
           $(".mask").stop().fadeOut(500);
       progressHadler();
       startWolfAnimation();
       //点击重新开始，重新刷新页面
       location.reload();
 });
    //定义一个处理灰太狼动画的方法
    function startWolfAnimation(){
   var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png',
       './images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
   var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png',
       './images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
   var arrPos=[
       {left:"100px",top:"115px"},
       {left:"20px",top:"160px"},
       {left:"190px",top:"142px"},
       {left:"105px",top:"193px"},
       {left:"19px",top:"221px"},
       {left:"202px",top:"212px"},
       {left:"120px",top:"275px"},
       {left:"30px",top:"295px"},
       {left:"209px",top:"297px"}
   ];
   //3.创建一个图片
        var $wolfImage=$("<img src='' class='wolfImage'>");

        // 创建一个随机数
        var posIndex=Math.round(Math.random()*8);
        //4.设置图片显示的位置
        $wolfImage.css({
            position:"absolute",
            left:arrPos[posIndex].left,
            top:arrPos[posIndex].top
        })
       //随机获取数组类型
         var wolfType=Math.round(Math.random())==0?wolf_1:wolf_2;
        //5.设置图片的属性
        window.wolfIndex=0;
         window.wolfIndexEnd=5;
        wolfTimer=setInterval(function(){
            if(wolfIndex>wolfIndexEnd){
                 $wolfImage.remove();
                 clearInterval(wolfTimer);
                startWolfAnimation();
            }
        $wolfImage.attr("src",wolfType[wolfIndex]);
        wolfIndex++;
        },300);
        // $wolfImage.attr("src",wolfType[5]);
        //6.把图片加入到页面中去
        $(".container").append($wolfImage);
        //处理游戏规则的方法
        gameStart($wolfImage);
    }
    //定义游戏规则的方法
    function gameStart($wolfImage){
        $wolfImage.one("click",function(){
              //拿到当前点击图片的地址
            window.wolfIndex=5;
        window.wolfIndexEnd=9;
            var $src=$(this).attr("src");
            //根据点击的图片地址判断是否是灰太狼
            var  flag=$src.indexOf("h")>=0;
            if(flag){

                window.time=$(".score").text(parseInt($(".score").text())+10);

            }else
            {
                $(".score").text(parseInt($(".score").text())-10);
            }
        })
    }
    //定义额一个关闭定时器的方法
function stopWolfAnimation(){
$(".wolfImage").remove();
clearInterval(wolfTimer);
time=0;
}
    //定义一个专门处理进度条的方法
   function progressHadler(){
       //重新设置进度条的宽度
       $(".progress").css({
           width:180
       });
         var times=setInterval(function(){
                var  progressWidth=$(".progress").width();
                progressWidth-=1;
                $(".progress").css({
                    width: progressWidth,
                });
             if(progressWidth<=0){
                 clearInterval(times);

                  $(".mask").fadeIn(400);
                  stopWolfAnimation();
             }
         },500);
   }
});