var stop = document.getElementById("stop");
var resume = document.getElementById("resume");
var fast = document.getElementById("fast");
var slow = document.getElementById("slow");
var normal = document.getElementById("normal");
var back = document.getElementById("back");
var positive = document.getElementById("positive");

var rangeSpe = document.querySelector("#speedSlider");
var es = document.getElementById("esca");

rangeSpe.addEventListener("change",function(event){
		var value = event.target.value;
		es.style.animationDuration = value + "s";
		es.style.webkitanimationDuration = value + "s";
		es.style.mozanimationDuration = value + "s";
	}
);

function stopEscalator(){

	es.style.animationPlayState = "paused";
	var infoSta = document.getElementById("infoSta");
	infoSta.innerText = "State:stop";
	//add stop the man
}

function resumeEscalator(){
	es.style.animationPlayState = "running";
	es.style.webkitanimationPlayState = "running";
	es.style.mozanimationPlayState = "running";
	var infoSta = document.getElementById("infoSta");
	infoSta.innerText = "State:running";
	//add stop the man
}

function fastEscalator(){
	es.style.animationDuration = "0.5s";
	es.style.webkitanimationDuration = "0.5s";
	es.style.mozanimationDuration = "0.5s";
	var infoSpe = document.getElementById("infoSpe");
	infoSpe.innerText = "Speed:fast";
}

function slowEscalator(){
	es.style.animationDuration = "1.5s";
	es.style.mozanimationDuration = "1.5s";
	es.style.webkitanimationDuration = "1.5s";
	var infoSpe = document.getElementById("infoSpe");
	infoSpe.innerText = "Speed:slow";
}

function normalEscalator(){
	es.style.animationDuration = "1s";
	es.style.webkitanimationDuration = "1s";
	es.style.mozanimationDuration = "1s";
	var infoSpe = document.getElementById("infoSpe");
	infoSpe.innerText = "Speed:normal";
}

function backEscalator() {
	es.style.animation = "escalatorReverse 1s steps(8,start) infinite";
	es.style.webkitanimation = "escalatorReverse 1s steps(8,start) infinite";
	es.style.mozanimation = "escalatorReverse 1s steps(8,start) infinite";
	var infoDir = document.getElementById("infoDir");
	infoDir.innerText = "Direction:back";
}

function positiveEscalator() {
	es.style.animation = "escalator 1s steps(8,end) infinite";
	es.style.mozanimation = "escalator 1s steps(8,end) infinite";
	es.style.webkitanimation = "escalator 1s steps(8,end) infinite";
	var infoDir = document.getElementById("infoDir");
	infoDir.innerText = "Direction:positive";
}

stop.onclick = stopEscalator;
resume.onclick = resumeEscalator;
fast.onclick = fastEscalator;
slow.onclick = slowEscalator;
normal.onclick = normalEscalator;
back.onclick = backEscalator;
positive.onclick = positiveEscalator;

