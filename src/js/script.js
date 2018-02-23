var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;

var cliques;

function start(){
	var cliques = 0;
	document.getElementById("circulo1").style.background = "black";
	document.getElementById("circulo2").style.background = "#C0C0C0";
	document.getElementById("circulo3").style.background = "#C0C0C0";
	document.getElementById("circulo4").style.background = "#C0C0C0";
	flag1 = true;
}

function clique(){
	cliques++;
}
function muda1(){
	if(flag1 == true){
		document.getElementById("circulo1").style.background = "#C0C0C0";
		document.getElementById("circulo4").style.background = "black";
		flag4 = true;
		flag1 = false;
	}
}
function muda2(){
	if(flag2 == true){
		document.getElementById("circulo2").style.background = "#C0C0C0";
		document.getElementById("circulo3").style.background = "black";
		flag3 = true;
		flag2 = false;
	}
}
function muda3(){
	if(flag3 == true){
		document.getElementById("circulo3").style.background = "#C0C0C0";
		document.getElementById("circulo1").style.background = "black";
		flag1 = true;
		flag3 = false;
	}
}
function muda4(){
	if(flag4 == true){
		document.getElementById("circulo4").style.background = "#C0C0C0";
		document.getElementById("circulo2").style.background = "black";
		flag2 = true;
		flag4 = false;
	}
}