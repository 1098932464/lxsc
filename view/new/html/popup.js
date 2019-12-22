 (function() {
        var btns = document.querySelectorAll(".popup-btn")
        for (var b of btns) {
            b.addEventListener("touchend", show)
        }

        var mask = document.querySelector(".shop-mask")
        mask.addEventListener("touchend", hide)

        function show(e) {
            document.querySelector(this.dataset.target).className += " show"
            mask.style.display = "block"
        }

        function hide(e) {

            var str = document.querySelector(".shop-popup").className.replace(/show/, "")
            document.querySelector(".shop-popup").className = str
            this.style.display = "none"
        }
    })()