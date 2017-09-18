/**
 * Created by Administrator on 2017/7/6.
 */
window.onload=function(){
//    左侧滑动
    leftSwipe();
//    右侧滑动
    rightSwipt();
};
//左侧滑动
var leftSwipe = function(){
//    获取元素
    var parentBox = document.querySelector(".jd_cateLeft");
    var childBox = parentBox.querySelector("ul");
//    获取两个盒子的高度用来计算可滑动的最大高度
    var parentBoxHeight = parentBox.offsetHeight;
    var childBoxHeight = childBox.offsetHeight;
//    可滑动的最大最小高度
    var maxPosition = 0;
    var minPosition = parentBoxHeight - childBoxHeight;

//    滑动距离
    var distance = 100;
    var maxSwipe = maxPosition + distance;
    var minSwipe = minPosition - distance;

//    加过渡
    var addTransation = function(){
        childBox.transition = "all,0.2s";
        childBox.webkitTransition = "all,0.2s";
    };

//    去过渡
    var removeTransation = function(){
        childBox.transition = "none";
        childBox.webkitTransition = "none";
    };

//    定位
   var setTranslateY = function(translateY){
       childBox.style.transform = "translateY("+translateY+"px)";
       childBox.style.webkitTransform = "translateY("+translateY+"px)"
   };

    var startY = 0;
    var distanceY = 0;
    var isMove = false;
    //记录当前定位
    var currentY = 0;
//  滑动事件
    childBox.addEventListener("touchstart",function(e){
        removeTransation();
        startY = e.touches[0].clientY;
    });
    childBox.addEventListener("touchmove",function(e){
        e.preventDefault();
        moveY = e.touches[0].clientY;
        //计算移动距离
        distanceY = moveY - startY;
        //如果大于最大移动位置且小于最小移动位置，确定当前位置
        if((currentY+distanceY)>=minSwipe&&(currentY+distanceY)<=maxSwipe){
            setTranslateY((currentY+distanceY));
        }

        isMove = true;

    });
    childBox.addEventListener("touchend",function(e){
        if (isMove){
            if ((currentY+distanceY)>maxPosition){
                currentY = maxPosition;
                addTransation();
                setTranslateY(currentY);
            }else if((currentY+distanceY)<minPosition){
                currentY = minPosition;
                addTransation();
                setTranslateY(currentY);
            } else {
                //记录定位 currentY必须，因为distanceY 需要重置为0；
                currentY = currentY + distanceY;
            }
        }
        startY = 0;
        distanceY = 0;
        isMove = false;
    });
};
//右侧滑动
var rightSwipt = function(){
  new IScroll(".jd_cateRight",{
      scrollX:true
  });

};