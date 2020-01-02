class Marquee{
    constructor (wrapper_id,list_id,list2_id,speed=1){
        this.speed=speed
        this.list_wrapper = document.getElementById(wrapper_id);
        this.list = document.getElementById(list_id);
        this.list2 = document.getElementById(list2_id);
        this.list2.innerHTML=this.list.innerHTML
    requestAnimationFrame(this.start.bind(this))
   
    }
    start(){
        // 判断是否超界
        if(this.list2.offsetWidth-this.list_wrapper.scrollLeft<0){
            this.list_wrapper.scrollLeft=this.list_wrapper.scrollLeft-this.list2.offsetWidth
            
        }else{
            this.list_wrapper.scrollLeft+=this.speed
        }
        requestAnimationFrame(this.start.bind(this))
    }
}