(function(window){
   var spdialog={
       show:function(id){
        var mask= $("<div class='sp-mask'></div>")
        $("body").append(mask)
        mask.tap(function(){
            mask.remove()
            $("#"+id).hide()
        })
      $("#"+id).show()
       }
   }

  window.spdialog=spdialog
})(window)