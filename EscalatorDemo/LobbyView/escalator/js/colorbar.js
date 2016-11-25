/**
 * Created by shidian on 2016/11/9.
 */
var colorBar= document.querySelector("#colorBar");
var stopC = document.querySelector("#stopC");
var resumeC = document.querySelector("#resumeC");

function stopBar(){
	colorBar.style.animationPlayState = "paused";
}

function resumeBar(){
	colorBar.style.animationPlayState = "running";
}

stopC.onclick = stopBar;
resumeC.onclick = resumeBar;
