/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
jQuery.fn.ImgSlider = function() {
  // Тут пишем код
    var make = function(){
        
        var items=this.querySelectorAll('.slider-item');
        
        items.forEach(function(item, i, items) {
            item.style.backgroundImage = "url('"+item.dataset.url+"')";
            items[i].style.opacity="0";
        });
        items[0].style.opacity="1";
        var i=0;
        setTimeout(function slide() {
            i=i<items.length-1?i+1:0;
            if(i>0){
                items[i-1].style.opacity="0";
                items[i].style.opacity="1";
            }else{
                items[items.length-1].style.opacity="0";
                items[i].style.opacity="1";
            }
            
            setTimeout(slide, 10000);
            }, 10000);


      // реализация работы метода с отдельным элементом страницы
    };
 
    return this.each(make); 
    // в итоге, метод responsiveBlock вернет текущий объект jQuery обратно
};



