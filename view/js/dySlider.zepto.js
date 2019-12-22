"use strict";
(function (window) {
    window.dySlider = dySlider
    function dySlider(id, opts) {
        this.id = id
        this.data = opts.data
        if (this.data) {
            this.loadData(this.data)
        }
        this._init(id, opts)
    }
    dySlider.prototype.loadData = function (data) {
        var $el = $("#" + this.id)
        $el.html("")
        $el.off()
        var str = ""
        data.forEach(element => {
           let keys= Object.keys(element)
           var keys_str=""
            keys.forEach(_e=>{
                if( typeof element[_e]!="object"&&_e!="img")
                keys_str+=" data-"+_e+"='"+element[_e]+"'"
            })
            str += "<li class='item' "+keys_str+"><img src='" + element.img + "'></li>"
        });
        $(str).appendTo($el)

    }
    dySlider.prototype.reSort = function () {
        var $el = $("#" + this.id)
        var curObj = this
        $el.find(".item").each(function (i, e) {
            $(e).data("idx", i)
            $(e).off()
            $(e).tap(function () {
                curObj.isTap = true
                curObj.notScrolling=true
                $el[0].scrollTo({
                    left: (i) * curObj.i_width,
                    behavior: "smooth"
                })
                setTimeout(() => {
                    curObj.isTap = false
                    curObj.notScrolling=false
                }, 1000);
                curObj.defaultOpts.tap(e)
            })
        })
    }
    dySlider.prototype._init = function (id, opts) {
        var curObj=this
        var defaultOpts = {
            tap: function (el) {
            },
            isVipcard: false
        }
        var $el = $("#" + id)
        $.extend(defaultOpts, opts)
        this.defaultOpts = defaultOpts
        var sc_width = document.documentElement.offsetWidth
        var sc_mid = sc_width / 2
        var i_width = sc_width * (defaultOpts.isVipcard ? 30 : 19.5) / 100;
        this.i_width = i_width

        var len=$el.find(".item").length
        
        var act_idx = defaultOpts.isVipcard ? 1 : 2
        
        if(defaultOpts.isVipcard&&len<2){
            act_idx--
        }else if(!defaultOpts.isVipcard&&len<3){
            act_idx=len-1
        }
        var act_el
        this.notScrolling = false
        this.isIniting=true
         // 排序
         this.reSort()
        var intiEl=$el.find("[data-idx='"+act_idx+"']")
        intiEl.addClass("active")
        intiEl.css("transition","none")
        $el.scrollLeft(i_width * act_idx)
         var src = intiEl.find("img")[0].src

         $el.siblings(".slider-bg").css("background-image", "url(" + src + ")")
        // 初始化
        setTimeout(() => {
            intiEl.css("transition","all .2s linear;")
            this.isIniting=false
        }, 200);
       defaultOpts.tap($el.find("[data-idx='"+act_idx+"']")[0])
       

        // 滚动事件
        var timer = null

        $el.scroll(function () {
            if(curObj.isIniting){
                return true
            }
            $el.find(".item").each(function (i, e) {

                var left = e.getBoundingClientRect().left
                var right = e.offsetWidth + left
                var mid = (left + right) / 2

                if (mid == sc_mid) {
                    $(e).addClass("active")

                    return false
                }
                if (sc_mid > left && right > sc_mid) {
                    act_idx = i
                    act_el = e
                    $(e).addClass("active")
                    var src = $(e).find("img")[0].src

                    $el.siblings(".slider-bg").css("background-image", "url(" + src + ")")
                } else {
                    $(e).removeClass("active")
                }
            })
            // 如果是点击对齐或者初始化对齐就不用自动对齐了
            if(curObj.notScrolling){
                return true
            }
            window.clearTimeout(timer);
            timer = window.setTimeout(function () {
                if (curObj.isTap) {
                    return
                }
                // 矫正位置
                $el[0].scrollTo({
                    left: (act_idx) * i_width,
                    behavior: "smooth"
                })

                defaultOpts.tap(act_el)
            }, 500);
        })
    }

})(window)
