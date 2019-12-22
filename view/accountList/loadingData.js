function loadingData(id, callBack) {
    this.id = id
    this.callBack = callBack
    this.scrollEl = {}
    this.isLoading = false
    this._init(id)
}
loadingData.prototype = {
    _init(id) {
        var scrollEl = document.getElementById(id)         
        this.scrollEl = scrollEl
        this.addEv() 
    },
    addEv() {
        this.scrollEl.addEventListener("scroll", this.scrollFn.bind(this))
    },
    removeEv() {
        this.scrollEl.removeEventListener("scroll", this.scrollFn.bind(this))
    },
    scrollFn() {
        var own=this
        if (this.isLoading) {
            return
        }       
        var scrollEl = this.scrollEl
        var sh = scrollEl.scrollHeight;
        if (sh < scrollEl.offsetHeight) {
            return
        }
        var h = scrollEl.scrollTop + scrollEl.offsetHeight;
       
        if (sh == h) {
            var li=document.createElement("li")
            var div=document.createElement("div")
            div.className="shop-loading-icon"
            li.appendChild(div)
            li.className="shop-loading"
            scrollEl.appendChild(li)

            // 到底了 防止抖动
            this.isLoading = true       
       
            new Promise((resolve, reject) => {
                own.callBack(resolve)
            }).then(function (value) {
                scrollEl.removeChild(li)
                // 加载完毕重新加上事件 加上延时，先让列表位置归位，就不会触发scroll事件了
                setTimeout(()=>{
                    own.isLoading = false
                },1000)
            })
        }
    }
}
