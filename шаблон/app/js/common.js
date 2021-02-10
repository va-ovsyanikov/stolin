$(document).ready(function(){

    //btn menu mobile
    $('.btn_nav').click(function(){
        $(this).toggleClass('active');
    });
    $('.btn_nav').click(function(){

        var nav = $('nav');
        if(nav.is(":hidden")){
            nav.fadeIn();
        }else{
            nav.fadeOut();
        }



    });







    //    owlCarousel
    $("#owl-carousel_header").owlCarousel({
        navigation : true, 
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        items : 1,
        loop:true,
        autoplay:true,
        smartSpeed:1500,
        autoplayTimeout:3000,
        itemsMobile : true,
        navText:'',
        nav:true,
        animateOut:  'fadeOut',
        animateIn:  'fadeIn' ,
        mouseDrag:	false 

    });



    //    owlCarousel
    $("#owl-carousel_routes").owlCarousel({
        navigation : true, 
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        items : 3,
        loop:true,
        autoplay:true,
        smartSpeed:1500,
        autoplayTimeout:4000,
        autoplayHoverPause: true,
        itemsMobile : true,
        nav:true,
        navText : ["⟨","⟩"],
        autoplayHoverPause: true,
        responsive:{
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }

    });


    //    magnificPopup
    $('#header_top_btn').magnificPopup({
        type:'inline',
        midClick: true,
        removalDelay: 300

    });
    
    
    
        if ($('.top_link').length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = $(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    $('.top_link').addClass('top_link_show');
                } else {
                    $('.top_link').removeClass('top_link_show');
                }
            };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('.top_link').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }

 setTimeout(        function() {
       $(".logo").animate({"opacity": "0"}, 2000);   
    }, 1000); 
        
setInterval ( function() {    
    setTimeout(        function() {
        $(".logo").animate({"opacity": "0"}, 2000); 
    }, 2000);
    
    setTimeout(        function() {
        $(".logo").animate({"opacity": "1"}, 2000); 
    }, 5000);  
}, 5000);  
       
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    

});


