"use strict";

// ==== Initial Google Map ====
function initialize(latitude, longitude, address, zoom) {
    var latlng = new google.maps.LatLng(latitude,longitude);

    var myOptions = {
        zoom: zoom,
        center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    var marker = new google.maps.Marker({
        position: latlng, 
        map: map, 
        title: "location : " + address
    });
}

// ==== Go to top ====
function go_up(){
    // to top
    $('.go-up').hide();
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 400) {
            $('.go-up').fadeIn();
        } else {
            $('.go-up').fadeOut();
        }
		
		return false;
    });
    $('.go-up a').on('click', function (e) {
        e.preventDefault();
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        
		return false;
    });
}

// ==== Used to compensante Chrome/Safari bug (they don't care about scroll bar for width) ====
function scrollCompensate()
{
    var inner = document.createElement('p');
    inner.style.width = "100%";
    inner.style.height = "200px";

    var outer = document.createElement('div');
    outer.style.position = "absolute";
    outer.style.top = "0px";
    outer.style.left = "0px";
    outer.style.visibility = "hidden";
    outer.style.width = "200px";
    outer.style.height = "150px";
    outer.style.overflow = "hidden";
    outer.appendChild(inner);

    document.body.appendChild(outer);
    var w1 = inner.offsetWidth;
    outer.style.overflow = 'scroll';
    var w2 = inner.offsetWidth;
    if (w1 == w2) w2 = outer.clientWidth;

    document.body.removeChild(outer);

    return (w1 - w2);
}

// ==== Responsive Resize ====
function responsiveResize()
{
    var compensante = scrollCompensate();
    if (($(window).width()+scrollCompensate()) <= 767 && responsiveflag == false) {
        accordion('enable');
        accordionFooter('enable');
        responsiveflag = true;
    } else if (($(window).width()+scrollCompensate()) >= 768) {
        accordion('disable');
        accordionFooter('disable');
        responsiveflag = false;
        if (typeof bindUniform !=='undefined')
            bindUniform();
    }
}

// ==== Accordion Footer ====
function accordionFooter(status)
{
    if(status == 'enable') {
        $('#footer .footer-block h4').on('click', function(e){
            $(this).toggleClass('active').parent().find('.toggle-footer').stop().slideToggle('medium');
            e.preventDefault();
			
			return false;
        })
        $('#footer').addClass('accordion').find('.toggle-footer').slideUp('fast');
    } else {
        $('.footer-block h4').removeClass('active').off().parent().find('.toggle-footer').removeAttr('style').slideDown('fast');
        $('#footer').removeClass('accordion');
    }
}

// ==== Accordion ====
function accordion(status)
{
    if(status == 'enable') {
        var accordion_selector = '#right_column .block .title_block, #left_column .block .title_block';

        $('#right_column .block .title_block, #left_column .block .title_block').on('click', function(e){
            $(this).toggleClass('active').parent().find('.block_content').stop().slideToggle('medium');
			
			return false;
        });
        $('#right_column, #left_column').addClass('accordion').find('.block .block_content').slideUp('fast');
    } else {
        $('#right_column .block .title_block, #left_column .block .title_block').removeClass('active').off().parent().find('.block_content').removeAttr('style').slideDown('fast');
        $('#left_column, #right_column').removeClass('accordion');
    }
}

// ==== Document ready ====
var responsiveflag = false;
var checkfixed = false;
$(document).ready(function(){ 
    go_up();
    responsiveResize();
    $(window).resize(responsiveResize);

    // ==== Create menu for mobile ====
	$('#all').after('<div id="off-mainmenu"><div class="off-mainnav"><div class="off-close"><span class="title">Menu</span><span class="close-menu"><i class="fa fa-close"></i></span></div></div></div>');
    $('.megamenu').clone().appendTo('.off-mainnav');

    $('.off-mainnav .megamenu li.dropdown, .off-mainnav .megamenu li.dropdown-submenu').each(function() {
        $(this).find('a').first().after('<span class="icon-down"><i class="fa fa-angle-down"></i></span>');
    });
    
    $('#btn-menu').on('click', function (e) {
        e.preventDefault();
        $('body').toggleClass('mainmenu-active');
		
		return false;
    });
	
    $('.off-close .close-menu').on('click', function (e) {
        e.preventDefault();
        $('body').removeClass('mainmenu-active');
		
		return false;
    });
	
	$('.icon-down').on('click', function (e) {
        $(this).closest('li').find('.dropdown-menu').first().toggleClass('tiva-active');
		
		return false;
    });

	// ==== Display menu when resize window ====
    $(window).on('resize', function () {
        var win = $(this); //this = window
        if (win.width() >= 1000) {
            $('#main-nav').css({
                display: 'block'
            });
        }
		
		return false;
    });
    
    // ==== Fix menu postion when scroll ====
    $('.btn-fixedheader .no').on('click', function (e) {
        checkfixed = false;
        $('.btn-fixedheader .no').addClass('active');
        $('.btn-fixedheader .yes').removeClass('active');

        return false;
    });

    $('.btn-fixedheader .yes').on('click', function (e) {
        checkfixed = true;
        $('.btn-fixedheader .no').removeClass('active');
        $('.btn-fixedheader .yes').addClass('active');
        
        return false;
    });
    $(window).on('scroll', function () {
        if(checkfixed) {
            if ($(window).scrollTop() > 120) {
                $('#top-header').addClass('fixed');
            } else {
                $('#top-header').removeClass('fixed');
            }
        }
        else {
            $('#top-header').removeClass('fixed');
        } 

        return false;
    });


    // ==== Display navigation home-1 ====
    $('.icon-trigger').on('click', function (e) {
        e.preventDefault();
        $('.topheader-navholder').toggleClass('open');
        $('.icon-trigger').toggleClass('open');
		
		return false;
    });

    // ==== Display navigation home-3 ====
    $("#btn-bar").on('click', function (e) {
        e.preventDefault();
        $('.siderbarmenu').addClass('siderbarmenu-active');
        $('.bg-over-lay').addClass('show-over-lay');
		
		return false;
    });
    $('.bg-over-lay').on('click', function (e) {
        e.preventDefault();
        $('.bg-over-lay').removeClass('show-over-lay');
        $('.siderbarmenu').removeClass('siderbarmenu-active');
		
		return false;
    });
    $(".siderbarmenu .btn-close").on('click', function (e) {
        e.preventDefault();
        $('.bg-over-lay').removeClass('show-over-lay');
        $('.siderbarmenu').removeClass('siderbarmenu-active');
		
		return false;
    });

    // ==== Slideshow ====
    $('.main-slider').owlCarousel({
        items: 1,
        nav: true,
        dots: true
    });

    // ==== Product list owl carousel ====
    $('.prolist-owlcaousel').owlCarousel({
        loop: true,
        margin:30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: true,
                loop: true
            }
        }
    });

    // ==== Blogs owl carousel ====
    $('.postslist-owlcaousel').owlCarousel({
        loop: false,
        margin:30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: true,
                loop: false
            }
        }
    });

    // ==== Related Product ====
    $('.blockproductscategory_grid').owlCarousel({
        loop: true,
        margin: 30,
        stopOnHover: false,
        navigation: true,
        navigationText: ["&lsaquo;", "&rsaquo;"],
        pagination: false,
        paginationNumbers: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop: false
            }
        }
    });

    // ==== Manufactures ====
    $('.manufacture_block').owlCarousel({
        margin:30,
        stopOnHover: false,
        responsiveClass:true,
        responsive:{
            0:{
                items:2,
                nav:true
            },
            600:{
                items:4,
                nav:false
            },
            1000:{
                items:5,
                nav:true,
                loop: false
            }
        }
    });

    // ==== Testimonial ====
    $('#tesimonial-carousel').owlCarousel({
        margin:30,
        stopOnHover : false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:1,
                nav:false
            },
            1000:{
                items:1,
                nav:true,
                loop: false
            }
        }
    });


    // ==== Blogs owl carousel home 3 ====
    $('.postslist-owlcaousel-h3').owlCarousel({
        loop: false,
        margin:30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 1,
                nav: false
            },
            1000:{
                items: 1,
                nav: true,
                loop: false
            }
        }
    });

    // ==== featured items owl carousel home 4 ====
    $('.featured-owlcaousel').owlCarousel({
        loop: true,
        margin:30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 4,
                nav: true,
                loop: false
            }
        }
    });

    // ==== featured items owl carousel home 7 ====
    $('.featureditem-owl').owlCarousel({
        loop: true,
        margin:30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 4,
                nav: true,
                loop: false
            }
        }
    });

    // ==== TopCategories owl carousel home 7 ====
    $('.topcategories').owlCarousel({
        loop: false,
        margin: 0,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 1,
                nav: false
            },
            1000:{
                items: 1,
                nav: true,
                loop: false
            }
        }
    });

    // ==== Blogs owl carousel home 7 ====
    $('.postslist-owlcaousel-h7').owlCarousel({
        loop: false,
        margin: 30,
        stopOnHover: false,
        responsiveClass: true,
        responsive:{
            0:{
                items: 1,
                nav: true
            },
            600:{
                items: 1,
                nav: false
            },
            1000:{
                items: 1,
                nav: true,
                loop: false
            }
        }
    });

    // ==== About us (Meet our team) ====
    $('.team-owlcaousel').owlCarousel({
        margin:30,
        stopOnHover : false,
        responsiveClass:true,
        responsive:{
            0:{
                items:1,
                nav:true
            },
            600:{
                items:2,
                nav:false
            },
            1000:{
                items:3,
                nav:true,
                loop: false
            }
        }
    });

    // ===== Slider range ======
    $("#price-filter").slider({
        from: 0,
        to: 100,
        step: 1,
        smooth: true,
        round: 0,
        dimension: "&nbsp;$",
        skin: "plastic"
    });

    // ===== Block categories ======
    $('#categories_block_left ul li.parent .arrow').on('click', function (e) {
        e.preventDefault();
        $(this).parents('li.parent').find('ul').slideToggle('medium');
        $(this).toggleClass('active');
		
		return false;
    });

    // ==== Product detail image ====
	if ($('#image-block #view_full_size img').length) {
        $('#image-block #view_full_size img').elevateZoom({zoomType:"inner", cursor:"crosshair", easing:true, scrollZoom:false});
	}
	
    $('#thumbs_list ul li').on('click', function (e) {
        $('#image-block #view_full_size').html($(this).html()).find('img').elevateZoom({zoomType:"inner", cursor:"crosshair", easing:true, scrollZoom:false});;
		
		return false;
    });

	// ==== Gallery ====
    $('.block-gallery .row').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery:{enabled:true},
        zoom: {
            enabled: true,
            duration: 300 // don't foget to change the duration also in CSS
        }
    });
	
	// ==== Counter ====
	$('.counter-numb').counterUp({
		delay: 10
	});

    // ==== Popup Screen ====
	if ($('.tiva-popup-screen').length) {
        // Control when window small
        if (screen.width < 500) {
            $('.tiva-popup-screen .popup').css('width', '80%');
        }
        
        // Click to close popup
        $('html').on('click', function (e) {
            if (e.target.id == 'tiva-popupscreen') {
                $('.tiva-popup-screen').remove();
            }
        });
		
        $('.tiva-popup-screen .popup .close').on('click', function (e) {
            e.preventDefault();
            $('.tiva-popup-screen').remove();
        });
        
        // Screen duration
        setTimeout(function() {
            $('.tiva-popup-screen').remove();
        }, 20 * 1000);
    }

    // ==== Multi-color ====
    $('.multi-color .handle').on('click', function (e) {
        e.preventDefault();
        $('.multi-color').toggleClass('active');

        return false;
    });

    $('.multi-groupcolor .color').on('click', function (e) {
        $('.multi-groupcolor .color').removeClass('active');
        $(this).addClass('active');
        $('head').append('<link rel="stylesheet" href="css/multi-color/' + $(this).attr('id') + '/color.css" type="text/css" />');

    });
    
    // ==== Slideshow ====
    $('#tiva-slideshow').nivoSlider({ 
        effect: 'random',
        animSpeed: 1000,
        pauseTime: 5000,
        directionNav: true,
        controlNav: true,
        pauseOnHover: true
    });

    // ==== Video Introduction ====
    $('.video-link a').on('click', function (e) {
        e.preventDefault();
        $('.tiva-video-overlay').toggleClass('open');
        $('.video-link').css('display','none');
		
		return false;
    });

    $('.video-close a').on('click', function (e) {
        e.preventDefault();
        $('.tiva-video-overlay').toggleClass('open');
        $('.video-link').css('display','table-cell');
		
		return false;
    });

    // ==== Scroll down ====
    $('.scroll-down').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
		
		return false;
    });

    // ======= home 3 (discover more) =======
    $(".home-3 .tiva-prolist .product-container").slice(0, 6).show();
    $(".home-3 .tiva-prolist .more-load a").on('click', function (e) {
        e.preventDefault();
        $(".home-3 .tiva-prolist .product-container:hidden").slice(0, 3).slideDown();
        if ($(".home-3 .tiva-prolist .product-container:hidden").length == 0) {
            $(".home-3 .tiva-prolist .more-load a").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
		
		return false;
    });

    // ======= home 4 (View all collections) =======
    $(".home-4 .category-list .categoryitem").slice(0, 3).show();
    $(".home-4 .category-list .more-load a").on('click', function (e) {
        e.preventDefault();
        $(".home-4 .category-list .categoryitem:hidden").slice(0, 1).slideDown();
        if ($(".home-4 .category-list .categoryitem:hidden").length == 0) {
            $(".home-4 .category-list .more-load a").fadeOut('slow');
        }
        $('html,body').animate({
            scrollTop: $(this).offset().top
        }, 1500);
		
		return false;
    });

    // ==== Google Map ====
    var address = jQuery('.contact-address').html();
    var width = '100%';
    var height = '500px';
    var zoom = 16;
   
    // Create map html
	if (address) {
		$('#map').html('<div id="map_canvas" style="width:' + width + '; height:' + height + '"></div>');
		
		var geocoder = new google.maps.Geocoder();

		geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var latitude = results[0].geometry.location.lat();
				var longitude = results[0].geometry.location.lng();
				initialize(latitude, longitude, address, zoom);
			}
		});
	}

}); //end