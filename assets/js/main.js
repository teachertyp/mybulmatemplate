$(function () {
    function fontop(e,w){
          if (e > 50&&ontop==0) {
            // downscroll 
            $("#mmenu").css("opacity","0").addClass("ontop").css("opacity","1");
            ontop=1;
            
        } 
        if(e<=50) {
            // upscroll code
            $("#mmenu").removeClass("ontop");
            ontop=0;
        }  
    }
//Main Menu start
    var foo = $('#mainmenu > ul');
    foo.dropotron();
//Slider start    
    $("#imgslider").ImgSlider();
 
//Main Menu scroll top 
    var ontop = 0;
    var w=$("#mmenu").parent().width();
    var st = $(window).scrollTop();
    fontop(st,w);
    $(window).scroll(function (event) {
        st = $(this).scrollTop();
        fontop(st,w);
        lastScrollTop = st;
    });
    
//---------------Mobile menu    -----------------
        var mm=document.createElement('div');
        mm.className="modal";
        mm.id="momenu";
        var n = document.createElement('div');
        n.className="modal-background";
        mm.appendChild(n);
        var n = document.createElement('div');
        n.className="modal-content";
        mm.appendChild(n);
        n = document.createElement('button');
        n.className="modal-close is-large";
        n.setAttribute('aria-label', 'close');
        mm.appendChild(n);
        console.log(mm);
        document.body.appendChild(mm); 
    $(".side-nav").on("click",function(event){

        $("#momenu").addClass("is-active").find(".modal-content").html($("#mainmenu").html());
        return false;
        
        
    });
    
    $(document).on("click",".opener",function(){
        if($(this).parent().parent().parent().attr("id")=="momenu"){
            $(this).find("ul").css("position","relative").toggle();
        }
        
    });
    
    $(document).on("click",".modal-close",function(){
        $(".modal").removeClass("is-active");
        //document.body.style.position="unset";
        
    });
    
    $(document).on("click",".modal-background",function(){
        $(".modal").removeClass("is-active");
    })

});


