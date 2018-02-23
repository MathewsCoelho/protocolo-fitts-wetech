/* iniciar o script após o carregamento da 'pagina' */
window.addEventListener('DOMContentLoaded', init)


function init(){	
	/* FAZER: comentar o que são essas flags*/
	flag1 = false;
	flag2 = false;
	flag3 = false;
	flag4 = false;
	
	cliques = 0;
}

function start(){
	cliques = 0;
	gId("circulo1").style.background = "black";
	gId("circulo2").style.background = "#C0C0C0";
	gId("circulo3").style.background = "#C0C0C0";
	gId("circulo4").style.background = "#C0C0C0";
	flag1 = true;
}

function clique(){
	cliques++;
}

function muda1(){
	if(flag1 == true){
		gId("circulo1").style.background = "#C0C0C0";
		gId("circulo4").style.background = "black";
		flag4 = true;
		flag1 = false;
	}
}

function muda2(){
	if(flag2 == true){
		gId("circulo2").style.background = "#C0C0C0";
		gId("circulo3").style.background = "black";
		flag3 = true;
		flag2 = false;
	}
}

function muda3(){
	if(flag3 == true){
		gId("circulo3").style.background = "#C0C0C0";
		gId("circulo1").style.background = "black";
		flag1 = true;
		flag3 = false;
	}
}

function muda4(){
	if(flag4 == true){
		gId("circulo4").style.background = "#C0C0C0";
		gId("circulo2").style.background = "black";
		flag2 = true;
		flag4 = false;
	}
}

/* funções de redução, para diminuir codigo */

function gId(id){
	return document.getElementById(id)
}

function c(mensagem){
	console.log(mensagem)
}