// $("#hiddenBar").click(function(event) {
// 	/* Act on the event */
// 	var sidebarE = $(".sidebar");
// 	var mianE  = $("main-panel");
// 	sidebarE.hide('400', function() {
		
// 	});
// 	mianE.width("100%");
// });

$("#showBar").click(function(event) {
	/* Act on the event */
	var sidebarE = $(".sidebar");
	var mianE  = $("main-panel");
	sidebarE.show('fast', function() {
		
	});
	mianE.width("cal(100%-260px)");
});

$("#hiddenBar").click(function (){

                if(mobile_menu_visible == 1) {
                    $('html').removeClass('nav-open');

                    $('.close-layer').remove();
                    setTimeout(function(){
                        $toggle.removeClass('toggled');
                    }, 400);

                    mobile_menu_visible = 0;
                } else {
                    setTimeout(function(){
                        $toggle.addClass('toggled');
                    }, 430);


                    main_panel_height = $('.main-panel')[0].scrollHeight;
                    $layer = $('<div class="close-layer"></div>');
                    $layer.css('height',main_panel_height + 'px');
                    $layer.appendTo(".main-panel");

                    setTimeout(function(){
                        $layer.addClass('visible');
                    }, 100);

                    $layer.click(function() {
                        $('html').removeClass('nav-open');
                        mobile_menu_visible = 0;

                        $layer.removeClass('visible');

                         setTimeout(function(){
                            $layer.remove();
                            $toggle.removeClass('toggled');

                         }, 400);
                    });

                    $('html').addClass('nav-open');
                    mobile_menu_visible = 1;

                }
            });