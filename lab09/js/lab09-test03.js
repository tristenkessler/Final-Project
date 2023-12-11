/* add code after this comment */

document.addEventListener("DOMContentLoaded", function() {

    const panels = document.querySelectorAll('.panel');
    for(let pan of panels){
        pan.addEventListener("click", function(){
            this.classList.toggle('open');
        })
    }

});