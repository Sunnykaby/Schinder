var button1 = document.getElementById("button1");
var men = document.getElementById("men");
var removeButton = document.getElementById("button2");
var stop = document.getElementById("stop");
var resume = document.getElementById("resume");
var menArray = ["", "newspaper-", "phone-", "relaxed-", "briefcase-"];

function randomMan() {   // function to randomly choose man image
    return menArray[Math.floor((Math.random() * menArray.length))];
}


function insertMan() {
    var elem = '<div id="man" class="man"><img src="img/' + randomMan() + 'man.svg"></div>';
    var parser = new DOMParser();
    var Man = parser.parseFromString(elem, "text/html");
    var newMan = Man.getElementById("man");
    men.appendChild(newMan);    
}



function removeMan() {
    var elem = document.getElementById("man");
    men.removeChild(elem);
    
}

function stopEscalator(){
	var es = document.getElementById("steps");
	es.style.animationPlayState = "paused";
	//add stop the man
}

function resumeEscalator(){
	var es = document.getElementById("steps");
	es.style.animationPlayState = "running";
	//add stop the man
}

button1.onclick = insertMan;
button2.onclick = removeMan;
stop.onclick = stopEscalator;
resume.onclick = resumeEscalator;
