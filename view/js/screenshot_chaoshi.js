 // 初始化
 !function () {
    $("body").append(`
    <div id="temp"></div>
    <div id="lxkf" class="lxkf-wrapper">
<img class="bg" src="http://manage.yihuoshidai.com/files/3f61d5ba-67ff-469f-9a11-53a3ba57e511.png" alt="">
<img class="kf-code" src="https://wx.qlogo.cn/mmhead/CKibrMLPibsL09FnhxLHLzEK0Z0BSWibibAYqPzw0Zh4dUo/132"
    alt="">
</div>


<div class="screenshot-bottom">
<div id="fghy" class="item">
    <img src="./img/weixin.png" alt="">
    <div class="name">发给好友</div>
</div>
<div id="fxpyq" class="item">
    <img src="./img/pengyouquan.png" alt="">
    <div class="name">分享朋友圈</div>
</div>
<div id="bckp" class="item">
    <img src="./img/baocuntupian.png" alt="">
    <div class="name">
        保存卡片
    </div>
</div>
</div>`)
    $("#fghy,#fxpyq").click(function () {

        $(` <div id="fenxiang" class="fenxiang">
<div class="fx-btn">知道啦</div>
</div>`).appendTo("body").click(function () {
            $(this).remove()
        })
    })
    $("#bckp").click(function () {

        $("<div class='cabc'>长按下方图片,可以保存海报</div>").appendTo("body")
        setTimeout(() => {
            $(".cabc").remove()
        }, 2000);

    })
    var screenshot = {
        init: function (data) {
            var defalutData = {
                img: "http://manage.yihuoshidai.com//files/59527c24-6946-4ea8-b010-aac993f9ef29.jpg",
                url: "./img/lxsc_logo.jpg",
                portraitUrl: "./img/lxsc_logo.jpg",
                name: "郭庄芳香皮肤管理中心",
                title: "68强1506美容套餐！小气泡清洁+淋巴排毒+水养公主等八大项目",
                price: "68.00",
                like: "193",
                originPrice: "300",
                address: "陕西省渭南市林庆区东兴街是崇业路街道高薪-锦绣缘",
                username: "钢铁侠",
                qrcodeUrl: "http://localhost:5500"

            }
            $.extend(defalutData, data)
            var str
            var temp

            $(".screenshot-bottom").addClass("show")
            var load_str =
                ' <div id="loadingToast">\n' +
                '        <div class="weui-mask_transparent"></div>\n' +
                '        <div class="weui-toast">\n' +
                '            <i class="weui-loading weui-icon_toast"></i>\n' +
                '            <p class="weui-toast__content">数据加载中</p>\n' +
                '        </div>\n' +
                '    </div>'
            $("body").append(load_str)




            str = `
<section class="screenshot">
<header>
    <div class="lxsc"><img crossOrigin="Anonymous" src="${defalutData.url}" alt=""></div><div>利享商城</div>
</header>
<div class="card">
    <div class="cd-lf"></div>
    <div class="cd-rt"></div>
    <div class="top">
        <div class="zx-dm">
            <div class="lxzx">
                利享甄选
            </div>
            <div class="dividing"></div>
            <div class="dm">
                ${defalutData.name}
            </div>
        </div>
        <div class="img-wrapper">
            <img crossOrigin="Anonymous" src="${defalutData.img}" alt="">
        </div>
        <div class="spm">${defalutData.title}</div>
        <div class="jg-xh">
            <div class="jg">￥<span>${defalutData.price}</span></div>
            <div class="xh"><i class="iconfont icon-xihuan-copy"></i> ${defalutData.like} 人喜欢</div>
        </div>
        <div class="yj">原价: ￥${defalutData.originPrice}</div>
        <div class="dz">地址: <span>${defalutData.address}</span></div>
    </div>
    <div class="bottom">
        <div class="tx">
            <img crossOrigin="Anonymous" src="${defalutData.portraitUrl}" alt="">
        </div>
       <div class="mz-fx">
           <div class="mz">
               ${defalutData.username}
           </div>
           <div class="fx">
            发现了一个好东西，想跟你分享！~
           </div>
       </div>

        <div class="qrcode">

        </div>
    </div>
</div>
</section>`
            temp = $(str)
            var qr = temp.find(".qrcode")
            var div = document.createElement("div")
            var w = document.body.offsetWidth * 21.33333 / 100
            // 生成图片
            var qrcode = new QRCode(div, {
                text: defalutData.qrcodeUrl,
                width: w,
                height: w,
                colorDark: "#000000",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H
            });
            qr.append(div)
            var obj = temp[0]
            $("#temp").append(obj)
            setTimeout(() => {
         
                console.log(document.body.scrollTop);
                
                html2canvas(obj, {
                    // windowHeight:document.body.scrollHeight,
                    y:window.pageYOffset,
                    allowTaint: true,
                    useCORS: true,
                    width: obj.offsetWidth,
                    height: obj.offsetHeight,
                    proxy:"http://manage.yihuoshidai.com"
                }).then(function (canvas) {
                    $("#loadingToast").remove()
                    var mask = $("<div class='sp-mask'></div>")
                    mask.click(function () {
                        mask.remove()
                        $(".screenshot-img").remove()
                        $("#temp").html("")
                        $(".screenshot-bottom").removeClass("show")
                    })
                    $("body").append(mask)
                    var img = new Image();
                    img.src = canvas.toDataURL()
                    img.className = "screenshot-img"
                    document.body.appendChild(img);
                    screenshot.imgSrc=img.src
                });
            }, 500);
        }
    }
    window.screenshot = screenshot
}()


function lxkf() {
    var mask = $("<div class='sp-mask'></div>")
    $("body").append(mask)
    mask.click(function () {
        mask.remove()
        $("#lxkf").removeClass("show")
    })
    $("#lxkf").click(function () {
        mask.remove()
        $("#lxkf").removeClass("show")
    })
    $("#lxkf").addClass("show")

}