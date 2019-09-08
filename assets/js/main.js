window.onscroll = function() {scrollmenu()};

var navbar = document.getElementById("mmenu");
var sticky = navbar.offsetTop;
var wrapmenu = document.getElementById("wrapmenu");

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
        document.body.appendChild(mm);

function scrollmenu() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("ontop");
    wrapmenu.style.height="55px";
  } else {
    navbar.classList.remove("ontop");
    wrapmenu.style.height="0px";
  }
}

$(function () {

//Main Menu start
    var foo = $('#mainmenu > ul');
    foo.dropotron();
//Slider start    
	var slider=$("#imgslider");
	console.log(slider);
    if(slider.length>0) slider.ImgSlider();
 
 
 
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


