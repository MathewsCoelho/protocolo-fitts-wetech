/* iniciar o script após o carregamento da 'pagina'. */
window.addEventListener('DOMContentLoaded', init)


function init(){	

	/* variveis de configuração, adicionar mais configurações. */
	config = {
		'cor':{alvo:'#000', 'vizinho':'#C0C0C0'},
		'circulos': {'quantidade':10, 'alvo-inicial':0}
	}

	/* FAZER: comentar o que são essas flags. */
	flag1 = false;
	flag2 = false;
	flag3 = false;
	flag4 = false;
	
	cliques = 0;
}

function start(){
	cliques = 0;
	alvoCirculos(0)	
	flag1 = true;
}


function alvoCirculos(indiceAlvo){
	let circulos = document.getElementsByClassName("circulo")
	
	for (let i = 0; i < circulos.length; i++) {
		circulo = circulos[i]
		
		if(i == indiceAlvo){
			circulo.style.background = config['cor']['alvo']
		}else{
			circulo.style.background = config['cor']['vizinho']
		}
	}		

}

function clique(){
	cliques++;
}

function muda1(){
	if(flag1 == true){
		gId("circulo1").style.background = config.cor.vizinho;
		gId("circulo4").style.background = config.cor.alvo;
		flag4 = true;
		flag1 = false;
	}
}

function muda2(){
	if(flag2 == true){
		gId("circulo2").style.background = config.cor.vizinho;
		gId("circulo3").style.background = config.cor.alvo;
		flag3 = true;
		flag2 = false;
	}
}

function muda3(){
	if(flag3 == true){
		gId("circulo3").style.background = config.cor.vizinho;
		gId("circulo1").style.background = config.cor.alvo;
		flag1 = true;
		flag3 = false;
	}
}

function muda4(){
	if(flag4 == true){
		gId("circulo4").style.background = config.cor.vizinho;
		gId("circulo2").style.background = config.cor.alvo;
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