//-----get the elemtent-----//
var stop = document.getElementById("stop");
var resume = document.getElementById("resume");
var fast = document.getElementById("fast");
var slow = document.getElementById("slow");
var normal = document.getElementById("normal");
var back = document.getElementById("reverse");
var positive = document.getElementById("positive");
var light = document.querySelector("#light");
// var rangeSpe = document.querySelector("#speedSlider");
//sprite
//var es = document.getElementById("escalator");
//multi
var es = document.getElementById("escalator-multi");

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//--                                                       for sprite demo                                                                                               --//

// rangeSpe.addEventListener("change",function(event){
// 		var value = event.target.value;
// 		es.style.animationDuration = value + "s";
// 		es.style.webkitanimationDuration = value + "s";
// 		es.style.mozanimationDuration = value + "s";
// 	}
// );

function stopEscalator(){

	es.style.animationPlayState = "paused";
	es.style.webkitanimationPlayState = "paused";
	es.style.mozanimationPlayState = "paused";
	light.style.backgroundImage = "url(escalator/img/light/forbidden.png)"
}

function resumeEscalator(){
	es.style.animationPlayState = "running";
	es.style.webkitanimationPlayState = "running";
	es.style.mozanimationPlayState = "running";
	light.style.backgroundImage = "url(escalator/img/light/pass.png)"
}

function fastEscalator(){
	es.style.animationDuration = "0.5s";
	es.style.webkitanimationDuration = "0.5s";
	es.style.mozanimationDuration = "0.5s";
	// var infoSpe = document.getElementById("infoSpe");
	// infoSpe.innerText = "Speed:fast";
}

function slowEscalator(){
	es.style.animationDuration = "1.5s";
	es.style.mozanimationDuration = "1.5s";
	es.style.webkitanimationDuration = "1.5s";
	// var infoSpe = document.getElementById("infoSpe");
	// infoSpe.innerText = "Speed:slow";
}

function normalEscalator(){
	es.style.animationDuration = "1s";
	es.style.webkitanimationDuration = "1s";
	es.style.mozanimationDuration = "1s";
	// var infoSpe = document.getElementById("infoSpe");
	// infoSpe.innerText = "Speed:normal";
}

function backEscalator() {
	es.style.animation = "escalatorReverse 1s steps(9) infinite";
	es.style.webkitanimation = "escalatorReverse 1s steps(9) infinite";
	es.style.mozanimation = "escalatorReverse 1s steps(9) infinite";
	// var infoDir = document.getElementById("infoDir");
	// infoDir.innerText = "Direction:back";
}

function positiveEscalator() {
	es.style.animation = "escalator 1s steps(9) infinite";
	es.style.mozanimation = "escalator 1s steps(9) infinite";
	es.style.webkitanimation = "escalator 1s steps(9) infinite";
	// var infoDir = document.getElementById("infoDir");
	// infoDir.innerText = "Direction:positive";
}


//---------------------------     function binding     ----------------------------------------------------------------------------------------------------//
//----//
stop.onclick = stopEscalator;
resume.onclick = resumeEscalator;
fast.onclick = fastEscalator;
slow.onclick = slowEscalator;
normal.onclick = normalEscalator;
back.onclick = backEscalator;
positive.onclick = positiveEscalator;

//------------------------------------------------------------------------------------------------------------------------------------------------------------------//
//----                                                         for multi imgs Demo                                                                          --------//

function backEscalator(){
	es.style.animation = "escaReverse 1s linear infinite";
}

function positiveEscalator(){
	es.style.animation = "escaPositive 1s linear infinite";
}

// //-------------------------------------------------------------------------------------------------------------------------------------------------------------------//
// //---                                                                preloading images                                                                     ----------//

// function preloader(){
// 	if (document.images) {
// 		var images = new Array();
// 		function loaderImages(){
// 			for (i = 0; i < loaderImages.arguments.length; i++) {
// 				images[i] =  new Image();
// 				images[i].src = loaderImages.arguments[i];
// 			}
// 		}
// 		loaderImages(
// 			"escalator/img/esca/01.png",
// 			"escalator/img/esca/02.png",
// 			"escalator/img/esca/03.png",
// 			"escalator/img/esca/04.png",
// 			"escalator/img/esca/05.png",
// 			"escalator/img/esca/06.png",
// 			"escalator/img/esca/07.png",
// 			"escalator/img/esca/08.png",
// 			"escalator/img/esca/09.png",
// 			"escalator/img/esca/10.png",
// 			"escalator/img/light/forbidden.png",
// 			"escalator/img/light/pass.png",
// 			"escalator/img/LED/yellow.png",
// 			"escalator/img/LED/green.png",
// 			"escalator/img/LED/blue.png",
// 			"escalator/img/LED/red.png",
// 			"escalator/img/container.png"
// 			)
// 	}
// }
// // pre load this after the window onload

// // function addLoadEvent(func){
// // 	//do 
// // 	var oldOnload = window.onload;
// // 	if (typeof window.onload != "function") {
// // 		window.onload = func;
// // 	}
// // 	else{
// // 		window.onload = function(){
// // 			if (oldOnload) {oldOnload();}
// // 			func;
// // 		}
// // 	}
// // }

// // addLoadEvent(preloader);