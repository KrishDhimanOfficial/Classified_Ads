(function($) {
    "use strict";

    // pisticky Menu
    var header = $('.back-header');
    var win = $(window);
    win.on('scroll', function() {
        var scroll = win.scrollTop();
        if (scroll < 100) {
           header.removeClass("back-sticky");
        } else {
           header.addClass("back-sticky");
        }
    });

    /*-------------------------------------
        Parallax Sidebar
    -------------------------------------*/
    var back_parallax = $('.parallax');
    if(back_parallax.length){
        $('.parallax').parallax();
    }

    //Menu Code Here
    $("#backmenu").backResponsiveMenu({
        resizeWidth: '991', 
        animationSpeed: 'medium', 
        accoridonExpAll: false 
    });

    //Menu Active Here
    var path = window.location.href; 
    $('.back-menus li a').each(function() {
        if (this.href === path) {
            $(this).addClass('back-current-page');
        }
    });

    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW(
            {
                boxClass: 'wow', // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0, // distance to the element when triggering the animation (default is 0)
                mobile: false, // trigger animations on mobile devices (default is true)
                live: true       // act on asynchronously loaded content (default is true)
            }
        );
        wow.init();
    }

    if ($('.counter').length) { 
        $('.counter').counterUp({
            delay: 10,
            time: 2000
        });
    }
    
    // magnificPopup init
     var imagepopup = $('.image-popup');
     if(imagepopup.length) {
         $('.image-popup').magnificPopup({
             type: 'image',
             callbacks: {
                 beforeOpen: function() {
                    this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated zoomInDown');
                 }
             },
             gallery: {
                 enabled: true
             }
         });
     }


    //Taggle Js
    $('#menu-btn').on('click', function(e) {
        $(this).toggleClass("back__close");
        e.preventDefault();
    });

    // Home Slider Part
    if ($('.home-slider-part').length) {
        $('.home-slider-part').owlCarousel({
            loop:true,
            items:1,
            margin:0,
            autoplay:false,
            slideSpeed : 800,
            nav:true,
            dots:true,
            responsive:{
                0:{
                    dots:false,
                    nav:false,
                },
                768:{
                    dots:true,
                },
            }
        })
    }

    // Client Slider Part
    if ($('.client-slider').length) {
        $('.client-slider').owlCarousel({
            loop:true,
            items:2,
            margin:30,
            autoplay:false,
            slideSpeed : 300,
            nav:true,
            dots:false,
            center: false,
            responsive:{
                0:{
                    items:1,
                    center: false,
                },
                575:{
                    items:1,
                    center: false,
                },
                767:{
                    items:2,
                    center: false,
                },
                1200:{
                    items:2,
                },
            }
        })
    }

    // Client Slider Part
    if ($('#back-blog-slider').length) {
        $('#back-blog-slider').owlCarousel({
            loop:true,
            items:3,
            margin:20,
            autoplay:false,
            slideSpeed : 300,
            nav:false,
            dots:false,
            center: false,
            responsive:{
                0:{
                    items:1,
                    center: false,
                },
                575:{
                    items:1,
                    center: false,
                },
                767:{
                    items:2,
                    center: false,
                },
                1200:{
                    items:3,
                },
            }
        })
    }

    // Form js
    $('.form__wrapper-2--container').on('click', function() {
        $("#menu").slideToggle("slow");
    });

    $('.form__wrapper-2--container2').on('click', function() {
        $("#menu2").slideToggle("slow");
    });
   
    $('.form__wrapper-2--container3').on('click', function() {
        $("#menu3").slideToggle("slow");
    });

    // Countdown js
    var backcountdown = $('.back-countdown');
    if(backcountdown.length){
    const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;

    let birthday = "Feb 14, 2022 00:00:00",
    countDown = new Date(birthday).getTime(),
    x = setInterval(function() {   
        let now = new Date().getTime(),
        distance = countDown - now;
        document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
    //seconds
    }, 0)}

    //filter js
    var pifilter = $('.back-grid');
    if(pifilter.length){
        $('.back-grid').imagesLoaded(function() {
            $('.back-filter').on('click', 'button', function() {
                var filterValue = $(this).attr('data-filter');
                $grid.isotope({
                    filter: filterValue
                });
            });
            var $grid = $('.back-grid').isotope({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: {
                    columnWidth: '.grid-item',
                }
            });
        });
    }
    
    // portfolio Filter
    var filterbutton = $('.back-filter button');
      if(filterbutton.length){
        $('.back-filter button').on('click', function(event) {
          $(this).siblings('.active').removeClass('active');
          $(this).addClass('active');
          event.preventDefault();
        });
    }

    //Videos popup jQuery 
    var popup = $('.popup-videos');
    if(popup.length) {
        $('.popup-videos').magnificPopup({
            disableOn: 10,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        }); 
    }

    // Skill bar 
    var skillbar = $('.skillbar');
    if(skillbar.length) {
        $('.skillbar').skillBars({  
            from: 0,    
            speed: 4000,    
            interval: 100,  
            decimals: 0,    
        });
    }
    
    // Sticky Sidebar
    var contentsticky = $('.back-content-sticky');
    if(contentsticky.length) {
        $('.back-content-sticky, .back-sidebar-sticky').theiaStickySidebar({
            additionalMarginTop: 140,
            additionalMarginBottom: 20,
        });
    }


    //Video PopUp 
    var popup = $('.popup-video');
    if(popup.length) {
        $('.popup-video').magnificPopup({
            disableOn: 10,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        }); 
    }

    

    // One page menu js

    if ($('.back-one-page').length) {
        $('.back-menus li:first-child').addClass('active');
        $('.back-menus a').on('click', function(){
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            $('.back-menus li').removeClass('active');
            $(this).parent('li').addClass('active');
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: (target.offset().top - 70)
                    }, 1000, "easeInOutExpo");
                    return false;
                }
            }
        });

        var navChildren = $(".back-menus li.menu-item").children("a");
        var aArray = [];
        for (var i = 0; i < navChildren.length; i++) {
            var aChild = navChildren[i];
            var ahref = $(aChild).attr('href');
            aArray.push(ahref);
        }
    }

    //preloader
    $(window).on( 'load', function() {
        $("#back__preloader").delay(1000).fadeOut(400);
        $("#back__preloader").delay(1000).fadeOut(400);
    })

    // scrollTop init
    var pitotop = $('#backscrollUp'); 
    if(pitotop.length){   
        win.on('scroll', function() {
            if (win.scrollTop() > 350) {
                pitotop.fadeIn();
            } else {
                pitotop.fadeOut();
            }
        });
        pitotop.on('click', function() {
            $("html,body").animate({
                scrollTop: 0
            }, 500)
        });
    }
    var lastScrollTop = 0;
    $(window).scroll(function(event){
       var st = $(this).scrollTop();
       if (st > lastScrollTop){
           $( "#backscrollUp" ).removeClass( "back__up___scroll" );
       } else {
          $( "#backscrollUp" ).addClass( "back__up___scroll" );
       }
       lastScrollTop = st;
    });

})(jQuery);