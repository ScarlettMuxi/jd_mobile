/**
 * Created by Administrator on 2017/7/6.
 */
window.onload=function(){
    //搜索框颜色渐变
    search();
    //轮播图
    banner();
    //倒计时
    downTime();
};
//搜索框颜色渐变
var search = function(){
//    获取元素
    var jd_search_box = document.querySelector(".jd_search_box");
    var jd_banner = document.querySelector(".jd_banner");
    var height = jd_banner.offsetHeight;

//    监听滚动
    window.onscroll = function(){
        var opacity = 0;
        var top = document.body.scrollTop;
       // 滚动超出轮播图区域时固定透明度
       if (top>height){
           opacity=0.85;
       }
        //滚动范围在轮播图区域内时改变透明度
        else {
           opacity=top/height*0.85;
       }
    //    给搜索区域加透明度
        jd_search_box.style.backgroundColor="rgba(201,21,35,"+opacity+")";
    };
};
//轮播图
var banner = function(){
//    获取元素
    var jd_banner = document.querySelector(".jd_banner");
    var width = jd_banner.offsetWidth;
    var imgBox = jd_banner.querySelector("ul:first-child");
    var pointBox = jd_banner.querySelector("ul:last-child");
    var points = pointBox.querySelectorAll("li");

//    加过渡
    var addTransition = function(){
        imgBox.style.transition = "all,0.2s";
        imgBox.style.webkitTransition = "all,0.2s";
    };
//    去过渡
    var removeTransition = function(){
        imgBox.style.transition = "none";
        imgBox.style.webkitTransition = "none";
    };
//    定位
    var setTranslateX = function(translateX){
        imgBox.style.transform = "translateX("+translateX+"px)";
        imgBox.style.webkitTransform = "translateX("+translateX+"px)";
    };

//    自动滚动
    var index = 1;
    var timer = setInterval(function(){
        index++;
        addTransition();
        setTranslateX(-index*width);
    },2000);
    //无缝滚动
    imgBox.addEventListener("transitionend",function(){
        //    滚动到最后一张
        if (index>=9){
            index=1;
            removeTransition();
            setTranslateX(-index*width);
        }
        //    滚动到第一张
        if(index<=0){
           index=8;
            removeTransition();
            setTranslateX(-index*width);
        }
        setPoint();
    });
//    指示器对应改变
    var setPoint = function(){
    //    清除当前样式
        for(var i=0;i<points.length;i++){
            var obj = points[i];
            obj.classList.remove("now");
        }
    //    加上对应样式
        points[index-1].classList.add("now");
    };

    //开始滑动的坐标轴
    var startX = 0;
    //记录滑动的距离
    var distance = 0;
    //是否滑动过
    var isMove = false;
    imgBox.addEventListener("touchstart",function(e){
        //清除定时器
        clearInterval(timer);
        //获取第一个触摸点的初始坐标
        startX = e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove",function(e){
        //禁止浏览器默认事件
        e.preventDefault();
        // 获取第一个触摸点移动后现在的坐标
       var moveX = e.touches[0].clientX;
        //  计算滑动距离
        distance = moveX - startX;
        // 页面岁滑动距离而改变
        var translateX = -index*width+distance;
        //去过渡
        removeTransition();
        //定位
        setTranslateX(translateX);
        //确认移动
        isMove = true;
    });
    imgBox.addEventListener("touchend",function(e){
       //判断移动位置，是否该切换图片
        if (Math.abs(distance)>width/3){
            //判断触摸移动方向
            if (distance>0){
                index--;
            }else {
                index++;
            }
        //    加过渡
            addTransition();
        //    做定位
            setTranslateX(-index*width);
        }else {
        //    加过渡
            addTransition();
        //    做定位
            setTranslateX(-index*width);
        }
    //    滑动结束，变量重置
        startX = 0;
        distance = 0;
        isMove = false;
    //    加上定时器
        clearInterval(timer);
        timer = setInterval(function(){
            index++;
        //    加过渡
            addTransition();
        //    定位
            setTranslateX(-index*width);
        },2000)
    });
};
//倒计时
var downTime = function(){
    var time = 2*60*60;
//    获取时间盒子元素
    var spans = document.querySelector(".clock").querySelectorAll("span");
//    定时器
    var timer = setInterval(function(){
        time--;
        var h = Math.floor(time/3600);
        var m = Math.floor(time%3600/60);
        var s = time%60;

        spans[0].innerHTML = Math.floor(h/10);
        spans[1].innerHTML = h%10;
        spans[3].innerHTML = Math.floor(m/10);
        spans[4].innerHTML = m%10;
        spans[6].innerHTML = Math.floor(s/10);
        spans[7].innerHTML = s%10;
        if (time<=0){
            clearInterval(timer);
        }
    },1000)
};
