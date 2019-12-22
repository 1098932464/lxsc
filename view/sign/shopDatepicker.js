(function(){
    var TEMPLATE_MONTH = "<div class=\"swiper-slide\">\n" +
    "                            <div class=\"shop-month\"></div>\n" +
    "                        </div>"
var TEMPLATE_YEAR = "<div class=\"swiper-slide\">\n" +
    "                            <div class=\"shop-year\"></div>\n" +
    "                        </div>"
var TEMPLATE_WRAPPER = ' <div class="swiper-wrapper"></div>'
window.shopDatepicker=shopDatepicker
// 初始化日期选择器 id 必填
function shopDatepicker(id, opt) {
    this.el = {}
    this.opt = {}
    this.id = id
    // swiper对象
    this.yearPick = {}
    this.monthPick = {}
    // 当前年数字
    this.year = 0
    // 当前月数字
    this.month = 0
    // 显示
    this.showYearEl = {}
    this.showMonthEl = {}
    this._init( opt)
}
shopDatepicker.prototype = {
   show(){
    this.el.style.display="block"
   },
   hide(){
    this.el.style.display="none"
   },
    setDate(year,month){
        // 计算年下标
        var yearIdx=year-this.opt.startYear
        var monthIdx=month
        this.yearPick.slideTo(yearIdx)
        this.monthPick.slideTo(monthIdx)
    },
    getDate(){
        return {
            year:this.year,
            month:this.month
        }
    },
    textToEl(str) {

        var div = document.createElement("div")
        div.innerHTML = str

        var el = div.children[0]

        return el
    },
    _init(opt) {
    

        this.el = document.getElementById(this.id)
        this.showYearEl = this.el.querySelector(".shop-datepick-title span.shop-year")
        this.showMonthEl = this.el.querySelector(".shop-datepick-title span.shop-month")
        this.opt = {
            startYear: 2019,
            endYear: 2099,
            year: new Date().getFullYear(),
            month: new Date().getMonth()+1,
            dateChange:function(year,month){
            }
        }
        this.extend(this.opt, opt)
        this.year = this.opt.year
        this.month = this.opt.month
        this.dateChange=this.opt.dateChange
        this.showYearEl.innerHTML = this.year
        this.showMonthEl.innerHTML = this.month

        // 初始化年
        var yearWrapper = this.textToEl(TEMPLATE_WRAPPER)
        for (var i = this.opt.startYear; i < this.opt.endYear + 1; i++) {
            var tmpYearSlideEl = this.textToEl(TEMPLATE_YEAR)
            // 每个年的数字
            tmpYearSlideEl.dataset.num = i
            tmpYearSlideEl.children[0].innerHTML = i

            yearWrapper.appendChild(tmpYearSlideEl)
        }
        // 初始化月
        var monthWrapper = this.textToEl(TEMPLATE_WRAPPER)
        for (var i = 1; i < 13; i++) {
            var tmpMonthSlideEl = this.textToEl(TEMPLATE_MONTH)
            // 每个月的数字
            tmpMonthSlideEl.dataset.num = i
            tmpMonthSlideEl.children[0].innerHTML = i
            monthWrapper.appendChild(tmpMonthSlideEl)
        }


        // 年添加到dom中
        this.el.querySelector(".shop-datepick-year div[data-year]").appendChild(yearWrapper)
        // 月添加到dom中
        this.el.querySelector(".shop-datepick-month div[data-month]").appendChild(monthWrapper)
        // 初始化完毕 初始化swiper
        this._initSwiper()
    },

    extend(child, father) {
        for (var k in father) {
            if (child.hasOwnProperty(k)) {
                child[k] = father[k]
            }
        }
    },
    _initSwiper() {
        var shopDatepicker = this
        this.yearPick = new Swiper("#" + this.id + " div[data-year]", {
            initialSlide:shopDatepicker.year-shopDatepicker.opt.startYear,
            direction: 'vertical',
            slidesPerView: 1,
            height:50,
            widht:250,
            on: {
                slideChange() {
                    // 把当前的年存起来
                    shopDatepicker.year = this.slides[this.activeIndex].dataset.num
                    shopDatepicker.showYearEl.innerHTML = shopDatepicker.year
                    shopDatepicker.dateChange(shopDatepicker.year,shopDatepicker.month)
                }
            }
        })


        this.monthPick = new Swiper("#" + this.id + " div[data-month]", {
            initialSlide:shopDatepicker.month-1,
            direction: 'vertical',
            slidesPerView: 1,
            height:50,
            widht:250,
            loop:true,
            on: {
                slideChange() {
                    // 把当前的月存起来
                    shopDatepicker.month = this.slides[this.activeIndex].dataset.num
                    shopDatepicker.showMonthEl.innerHTML = shopDatepicker.month
                    shopDatepicker.dateChange(shopDatepicker.year,shopDatepicker.month)
                }
            }
        })
    }
}

})()