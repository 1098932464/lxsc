(function () {
    "use strict";
    var touchStartTime
    var offsetX = 0, offsetY, preScreenX, pageX = 0, maxPageX = 0, curIdx = 0, startScreenX,inited
    // 图片节点
    var nodes
    // 滚动容器
    var scrollWrap
    var CLASS_SLIDE_WRAP = "shop-slide-wrap"
    var CLASS_SLIDE_NODE = "shop-slide-node"
    var CLASS_SLIDE_OPEN_BTN="shop-open-slide"
    var CLASS_SLIDE_CLOSE_BTN=".shop-slide-container .close"
    var CLASS_SLIDE_CONTAINER="shop-slide-container"
    shopSlide.prototype._init = function () {
     
        scrollWrap = this.el.querySelector(" ." + CLASS_SLIDE_WRAP)
        // 滚动最大距离
        maxPageX = scrollWrap.clientWidth
        console.log("55555:"+maxPageX);
        nodes = this.el.querySelectorAll("." + CLASS_SLIDE_NODE)
        maxPageX = -(maxPageX - nodes[nodes.length - 1].offsetWidth)
        var i = 0
        
        
        for (var node of nodes) {
            node.dataset.idx = i++
            node.addEventListener("touchstart", this.touchStart.bind(this))
            node.addEventListener("touchmove", this.touchMove.bind(this))
            node.addEventListener("touchend", this.touchEnd.bind(this))
        }
    }

    shopSlide.prototype.touchStart = function (e) {
        console.log("maxPageX:"+maxPageX)
        touchStartTime = new Date().getTime()
        curIdx = parseInt(e.changedTouches[0].target.parentNode.dataset.idx)
        startScreenX = e.changedTouches[0].screenX
        preScreenX = e.changedTouches[0].screenX
    }

    shopSlide.prototype.touchMove = function (e) {
        var lastEv = e.changedTouches[0]
        pageX += lastEv.screenX - preScreenX
        console.log(pageX)
        if (pageX > 0) {
            pageX = 0
        }
        if (pageX < maxPageX) {
            pageX = maxPageX
        }

        // console.log(lastEv.screenX-preScreenX)
        this.setTranslateX(pageX)
        preScreenX = lastEv.screenX


    }

    shopSlide.prototype.touchEnd = function (e) {


        var endScreenX = e.changedTouches[0].screenX


        if (endScreenX - startScreenX > 0 && curIdx > 0) {
            // 右滑
            console.log("右滑")
            curIdx--
        } else if (endScreenX - startScreenX < 0 && curIdx < nodes.length - 1) {
            console.log("左滑")
            curIdx++
        } else {
            return
        }
        this.slideTo(curIdx)
    }

    shopSlide.prototype.slideTo = function (idx) {
        console.log("翻页了~~~")
        var constance = 0;
        for (var i = 0; i < idx; i++) {
            constance += nodes[i].offsetWidth
        }
        pageX = -constance
        this.setTranslateX(-constance)
    }

    shopSlide.prototype.setTranslateX = function (num) {
        scrollWrap.style.transform = `translateX(${num}px)`
    }
    shopSlide.prototype.bindTouchEv=function(){
        var el = document.querySelector("."+CLASS_SLIDE_CONTAINER)
        this.el=el
        document.querySelector(CLASS_SLIDE_CLOSE_BTN).addEventListener("click",exitScreen.bind(this))
        document.querySelector("."+CLASS_SLIDE_OPEN_BTN).addEventListener("click",fullScreen.bind(this))
      
    }

    // 全屏
    function fullScreen(){
        this.el.className+=" show"
        if(!inited){
            this._init()
            inited=true  
           }
           var el = document.documentElement;
           var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;      
           if(typeof rfs != "undefined" && rfs) {
               rfs.call(el);
           };
    
    }
    // 退出全屏
    function exitScreen(){
        this.el.className= this.el.className.replace(/\sshow/,"")
            document.webkitCancelFullScreen();  
    }

    function shopSlide() {
        this.bindTouchEv()
    }
    
    window.shopSlide = new shopSlide()
})()