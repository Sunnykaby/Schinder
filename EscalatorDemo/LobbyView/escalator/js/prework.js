//-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//---                                                                preloading images                                                                     ----------//

function preloader(){
	if (document.images) {
		var images = new Array();
		function loaderImages(){
			for (i = 0; i < loaderImages.arguments.length; i++) {
				images[i] =  new Image();
				images[i].src = loaderImages.arguments[i];
			}
		}
		loaderImages(
			"escalator/img/esca/01.png",
			"escalator/img/esca/02.png",
			"escalator/img/esca/03.png",
			"escalator/img/esca/04.png",
			"escalator/img/esca/05.png",
			"escalator/img/esca/06.png",
			"escalator/img/esca/07.png",
			"escalator/img/esca/08.png",
			"escalator/img/esca/09.png",
			"escalator/img/esca/10.png",
			"escalator/img/light/forbidden.png",
			"escalator/img/light/pass.png",
			"escalator/img/LED/yellow.png",
			"escalator/img/LED/green.png",
			"escalator/img/LED/blue.png",
			"escalator/img/LED/red.png",
			"escalator/img/container.png"
			)
	}
}
//do before the window onload
preloader();

// pre load this after the window onload

// function addLoadEvent(func){
// 	//do 
// 	var oldOnload = window.onload;
// 	if (typeof window.onload != "function") {
// 		window.onload = func;
// 	}
// 	else{
// 		window.onload = function(){
// 			if (oldOnload) {oldOnload();}
// 			func;
// 		}
// 	}
// }

// addLoadEvent(preloader);