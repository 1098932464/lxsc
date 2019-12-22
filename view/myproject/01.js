function isPassive() {
    var supportsPassiveOption = false;
    try {
        addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassiveOption = true;
            }
        }));
    } catch(e) {}
    return supportsPassiveOption;
}
  		 
function bindScroll(el){
    el.addEventListener('touchmove', function (e) {
         e.preventDefault();
         }, isPassive() ? {
        capture: false,
        passive: false
    } : false); 
}