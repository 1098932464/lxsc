(function () {
    var SHOP_CALENDAR_TEMPLATE = "<div> <table class='shop-calendar'>\n" +
        "                            <thead>\n" +
        "                                <tr>\n" +
        "                                    <th>日</th>\n" +
        "                                    <th>一</th>\n" +
        "                                    <th>二</th>\n" +
        "                                    <th>三</th>\n" +
        "                                    <th>四</th>\n" +
        "                                    <th>五</th>\n" +
        "                                    <th>六</th>\n" +
        "                                </tr>\n" +
        "                            </thead>\n" +
        "            \n" +
        "                        </table></div>"

    window.shopCalendar = function () {
        var sc = new shopCalendar()
        function getTextCalendarTable(year, month) {
            sc.setDate(year, month)
            return sc.tableEl.innerHTML
        }
        return getTextCalendarTable;
    }

    // 日历组件
    function shopCalendar(opt) {
        this.tableEl = {}
        this.yearEl = {}
        this.monthEl = {}
        this.year = 0
        this.month = 0
        this.weekArr={}
        this._init(opt)
    }
    function textToEl(str) {

        var div = document.createElement("div")
        div.innerHTML = str

        var el = div.children[0]

        return el
    }
    shopCalendar.prototype = {
        // 初始化 默认当前日期
        _init(opt) {
            this.opt = {
                day: new Date().getDate(),
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }
            this.extend(this.opt, opt)
            // 生成模板

            this.tableEl = textToEl(SHOP_CALENDAR_TEMPLATE)


        },
        changeDate() {
            var year = this.yearEl.value
            var month = this.monthEl.value
            this.setDate(year, month)
        },
        setDate(year, month) {
            this.year = year
            this.month = month
            var dayArr = this._getDayArr(year, month)
            // 生成日期项
            this._generateCalendar(dayArr)
        },
        _getDayArr(year, month) {
            // 查询指定月天数
            var days = this.getMonthDays(year, month)
            // 查询指定月第一天和最后一天星期
            var weekArr = this.getFirstAndLastWeek(year, month, days)

            // 查询开头的上个月天数
            var preDays = this.getMonthDays(year, month - 1)
            this.weekArr=weekArr
            var dayArr = []
            // 上个月天数
            for (var i = 0; i < weekArr.first; i++) {
                dayArr.push(preDays - weekArr.first + 1 + i)
            }
            // 当月天数
            for (var j = 0; j < days; j++) {
                dayArr.push(j + 1)
            }
            // 下个月天数
            for (var g = 0; g < (6 - weekArr.last); g++) {
                dayArr.push(g + 1)
            }
            return dayArr
        },
        _generateCalendar(dayArr) {
            var table = this.tableEl.children[0]
            table.dataset.year = this.year
            table.dataset.month = this.month
            if (table.querySelector("tbody"))
                table.removeChild(table.querySelector("tbody"))

            var tbody = document.createElement("tbody")
            var rowNum = dayArr.length / 7
            // 星期 0-6
            var preIdx=this.weekArr.first
            var lastIdx=this.weekArr.last
            var now=new Date()
            var now_year=now.getFullYear()
            var now_month=now.getMonth()+1
            var now_day=now.getDate()
        
           
            for (var h = 0; h < rowNum; h++) {
                var tr = document.createElement("tr")
                for (var hh = 0; hh < 7; hh++) {
                   
                    var td = document.createElement("td")
                    var td_day=dayArr[hh + h * 7]
                   
                    td.innerHTML = td_day
                    tr.appendChild(td)
                    // 判断今天
                    if(now_year==this.year&&now_month==this.month&&now_day==td_day){
                       
                        td.className="today"
                    }
                    // 判断是否补签
                    var flag=false
                    if(now_year==this.year){
                        if(now_month>this.month){
                            flag=true
                        }else if(now_month==this.month){
                            if(now_day>td_day){
                                flag=true
                            }
                        }
                    }
                    else if(now_year>this.year){
                        // 全部需要加上补签
                        flag=true
                    }
                    if(flag){
                        td.className="supplement"
                    }
                    if(h==0&&(hh<preIdx)){
                        // 第一行
                            td.className="disabled"
                    }else if((h==rowNum-1)&&hh>lastIdx){
                        // 最后一行
                            td.className="disabled"
                    }else{
                        td.dataset.day=td_day
                        td.dataset.year=this.year
                        td.dataset.month=this.month
                    }
                   
                }
                tbody.appendChild(tr)
            }
            table.appendChild(tbody)
        },

        getFirstAndLastWeek(year, month, lastDay) {
            var first = new Date(year, month - 1, 1)
            var last = new Date(year, month - 1, lastDay)
            return { first: first.getDay(), last: last.getDay() }
        },
        getMonthDays(year, month) {
            var date = new Date(year, month, 0)
            var days = date.getDate()
            return days
        },
        // father 被继承的对象 child最后的对象
        extend(child, father) {
            for (var k in father) {
                if (child.hasOwnProperty(k)) {
                    child[k] = father[k]
                }
            }
        }
    }
})();



   // 日历初始化
   (function () {
    var getTable = shopCalendar();
    // var date = new Date()
    // 注意!!!!!!!!date中的month是1-12
    window.initShopCalendar = initSwiper
    function getSwiperContent(year, month) {
        // 这里也是 1-12
        return '<div class="swiper-slide"> ' + getTable(year, month) + '</div>'
    }


    // 获取上一个月和年
    function getPreYearAndMonth(year, month) {
        var preMonth = month < 2 ? 12 : month - 1
        var preYear = month < 2 ? year - 1 : year
        return { month: preMonth, year: preYear }
    }
    // 获取下一个月和年
    function getNextYearAndMonth(year, month) {
        year = parseInt(year)
        month = parseInt(month)
        var nextMonth = month > 11 ? 1 : month + 1
        var nextYear = month > 11 ? year + 1 : year
        return { month: nextMonth, year: nextYear }
    }
    function initSwiper(id,showDate,afterInit) {
        var str = ""
        var now = new Date()
        var year = now.getFullYear()
        var month = now.getMonth() + 1
     
        var preMonth = month < 2 ? 12 : month - 1
        var preYear = month < 2 ? year - 1 : year

        var nextMonth = month > 11 ? 1 : month + 1
        var nextYear = month > 11 ? year + 1 : year

        str += getSwiperContent(preYear, preMonth)
        str += getSwiperContent(year, month)
        str += getSwiperContent(nextYear, nextMonth)
        document.querySelector("#" + id + " .swiper-wrapper").innerHTML = str

        var year_month = { year: new Date().getFullYear(), month: new Date().getMonth() }
        var swiper = new Swiper('#' + id, {
            initialSlide: 1,
            slidesPerView: 1,
            centeredSlides: true,
            spaceBetween: 30,
            on: {
                slideChange(ev) {
                    // 判断是到达最左边还是最右边
                    var slide=this.slides[this.activeIndex]
                    if(!slide){
                        return
                    }
                    var data = slide.querySelector("table").dataset
                    var year = data.year
                    var month = data.month
                    year_month = { year, month }
                    showDate(year_month.year, year_month.month)
                    if (this.activeIndex == 0) {
                        var pre = getPreYearAndMonth(year_month.year, year_month.month)
                        this.removeSlide(2)
                        this.prependSlide(getSwiperContent(pre.year, pre.month))
                    }
                    if (this.activeIndex == 2) {

                        var next = getNextYearAndMonth(year_month.year, year_month.month)

                        this.removeSlide(0)
                        this.appendSlide(getSwiperContent(next.year, next.month))
                    }
                    afterInit()
                }

            }
        });
        afterInit()
        var resFun= function(date){
            // date month 1-12
            // 判断当前日期
            var now_date=swiper.slides[swiper.activeIndex].children[0].dataset
   
            if((now_date.year==date.year)&&(now_date.month==date.month)){
                return
            }
            // 先删除原来的三个节点
            swiper.removeAllSlides()
            // 添加指定的节点
       
            var year = parseInt(date.year)
            var month = parseInt(date.month)
         
            var preMonth = month < 2 ? 12 : month - 1
            var preYear = month < 2 ? year - 1 : year
            
            var nextMonth = month > 11 ? 1 : 1+month
            var nextYear = month > 11 ? 1+year : year
            var str1 = getSwiperContent(preYear, preMonth)
            var str2 = getSwiperContent(year, month)
            var str3 = getSwiperContent(nextYear, nextMonth)


            swiper.appendSlide([str1,str2,str3])
            swiper.slideTo(1)
            afterInit()
        }
        return resFun
    }

   

})();
