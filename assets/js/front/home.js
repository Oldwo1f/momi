jQuery(document).ready(function($) {
        
        /************************
        ****** MasterSlider *****
        *************************/
        // Calibrate slider's height
        var sliderHeight = 0; // Smallest hieght allowed (default height)
        var sliderwidth = 1024; // Smallest hieght allowed (default height)
        if ( $('#masterslider').data('height') == 'fullscreen' ) {
            var winHeight = $(window).height();
            console.log(winHeight);
            sliderHeight = winHeight > sliderHeight ? winHeight : sliderHeight;
        }
        var winWidth = $(window).width();
            console.log(winWidth);
        sliderwidth = winWidth < sliderwidth ? winWidth : sliderwidth;
        console.log(sliderwidth);
        // Initialize the main slider
        var slider = new MasterSlider();
        slider.setup('masterslider', {
            space:0,
            fullwidth:true,
            autoplay:false,
            // centerControls:false,
            // overVideo:false,
            overPause:false,
            width:sliderwidth,
            height:sliderHeight,
            view:"fade",
            // view:"mask",
            // height:300,
            // autoHeight:true,
            heightLimit:true
        });
        // adds Arrows navigation control to the slider.
        slider.control('bullets',{autohide:false, dir:"h"});
        slider.control('thumblist',{autohide:true});
        
        var teamslider = new MasterSlider();
        teamslider.setup('teamslider' , {
            loop:true,
            width:300,
            height:290,
            speed:20,
            view:'stffade',
            grabCursor:false,
            preload:0,
            space:29
        });
        teamslider.control('slideinfo',{insertTo:'#staff-info'});
        
        $(".team .ms-nav-next").click(function() {
            teamslider.api.next();  
        });
        
        $(".team .ms-nav-prev").click(function() {
            teamslider.api.previous();  
        });
    });