
(function(){
   
    function shopSpecifications(selector, data) {
        // 原来的价格
        this.originPrice = 0
        // 已选项
        this.checkedItem = {}
        // 已选el按钮
        this.checkedEl = {}
        // 总价el
        this.price = {}
        // 库存el
        this.num = {}
        // 标题已选规格内容el
        this.checkedTitle={}
        this._init(selector, data)
    }
    window.shopSpecifications=shopSpecifications
    shopSpecifications.prototype._init = function (selector, data) {
        var el = document.querySelector(selector)
        //    默认图片
        var img_default = data.default_img;
        var img = el.querySelector(".shop-specifications-img img")
        img.src = img_default;
        // 默认价格
        this.originPrice = data.originPrice
        // 价格el
        var price = el.querySelector(".shop-specifications-price>div:first-child>span")
        this.price = price
        price.innerHTML = data.default_price;
        // 库存el
        this.num = el.querySelector(".shop-specifications-num")
        // 标题已选规格内容el
        this.checkedTitle=el.querySelector(".shop-specifications-price>div:last-child")
        // 规格el
        var content = el.querySelector(".shop-specifications-list")
        var specifications_item_template = '  <div>' + '</div>'
        var specifications_content_template =
            ' <div class="shop-specifications-detail">' +
            '  <div class="shop-specifications-detail-title">内存容量</div>' +
            '      <div class="shop-specifications-detail-content">' +
            '      <div>8GB</div>' +
            '        <div>18GB</div>' +
            '    <div>118GB</div>' +
            '  <div>1118GB</div>' +
            ' </div>' +
            '</div>';

        var specifications = data.specifications;
        var specifications_detail = ""
        for (var specification of specifications) {
            var tmp = ' <div class="shop-specifications-detail">' +
                '  <div class="shop-specifications-detail-title">' + specification.title +
                '</div>' +
                '  <div class="shop-specifications-detail-content" data-title="' + specification.title + '">'
            var specificationContents = specification.content;
            for (var s_c of specificationContents) {
                tmp += ' <div data-price="' + s_c.addPrice + '" data-num="' + s_c.addNum +
                    '">' + s_c.value + '</div>'
            }
            tmp += ' </div>' +
                '</div>';
            specifications_detail += tmp
        }

        content.innerHTML = specifications_detail
        var touchArr = content.querySelectorAll(".shop-specifications-detail-content")

        for (var t_item of touchArr) {
            t_item.addEventListener("touchend", e => {
                var p = e.target.dataset.price
                var n = e.target.dataset.num
                var v=e.target.innerHTML
                if (p) {
                    var title = e.target.parentNode.dataset.title
                    // 清除先前的样式 checkedEl
                    var preBtn = this.checkedEl[title];
                    if (preBtn) {
                        if (preBtn == e.target) {
                            if(preBtn.className==""){
                                preBtn.className = "active"
                            }else{
                            preBtn.className = ""
                            }
                        } else {
                            preBtn.className = ""
                            e.target.className = "active"
                        }

                    }else{
                        e.target.className = "active"
                    }
                    this.checkedEl[title] = e.target;
                    this.checkedItem[title] = { p: p, n: n }
                    this.checkedItem[title] = { p: p, n: n ,v:v}
                    this.changeItem()
                }

            })

        }

    }


    // 更改规格
    shopSpecifications.prototype.changeItem = function () {


        var addPrice = 0
        var addNum = 0
        var title=""
        for (var k in this.checkedItem) {
            addPrice += parseFloat(this.checkedItem[k].p)
            addNum += parseFloat(this.checkedItem[k].n)
            title+=this.checkedItem[k].v+" "
        }


        this.price.innerHTML = this.originPrice + addPrice
        this.num.innerHTML = addNum
        this.checkedTitle.innerHTML=title
    }
})()
       
