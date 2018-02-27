/* iniciar o script após o carregamento da 'pagina'. */
window.addEventListener('DOMContentLoaded', init)


function init(){	

	/* variveis de configuração, adicionar mais configurações. */
	config = {
		'cor':{alvo:'#000000', 'vizinho':'#C0C0C0'},
		'circulos': {'quantidade':10, 'alvo-inicial':0},
		'sequencia': '',
	}

	/* config['sequencia'] = 'sequencial' || 'aleatoria' || 'extremo-oposto' */
	config['sequencia'] = 'sequencial';


	circulos = elementosCirculo()

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
	for (let i = 0; i < circulos['tamanho']; i++) {			
		
		if(i == indiceAlvo){
			circulos[i]['cor'] = config['cor']['alvo']
		}else{
			circulos[i]['cor'] = config['cor']['vizinho']
		}
	}

	atualizarCirculos()		
	
}

function controleAlvos(){
	
	/* renderizar alvos */
	if(config['sequencia'] == 'sequencial'){

		let circulos = document.getElementsByClassName("circulo")
	
		for (let i = 0; i < circulos.length; i++) {
			let circulo = circulos[i]			
			
		}


	}else if( config['sequencia'] == 'aleatoria' ){
		c("ordem ainda não desenvolvida")
	}else if( config['sequencia'] == 'extremo-oposto' ){
		c("ordem ainda não desenvolvida")
	}
}

function elementosCirculo(){
	let el = {}

	let circulos = document.getElementsByClassName("circulo")

	el['tamanho'] = document.getElementsByClassName("circulo").length
	
	for (let i = 0; i < circulos.length; i++) {		
		el[i] = {}
		el[i]['cor'] = circulos[i].style.backgroundColor || config['cor']['vizinho']
	}

	return el
}

function atualizarCirculos(){
	let circulosDOM = document.getElementsByClassName("circulo")

	for (let i = 0; i < circulos['tamanho']; i++) {
		circulosDOM[i].style.backgroundColor = circulos[i]['cor']
	}
}

function clique(){
	cliques++;
}

function muda1(){
	if(flag1 == true){
		alvoCirculos(3)
		flag4 = true;
		flag1 = false;
	}
}

function muda2(){
	if(flag2 == true){
		alvoCirculos(2)
		flag3 = true;
		flag2 = false;
	}
}

function muda3(){
	if(flag3 == true){
		alvoCirculos(0)
		flag1 = true;
		flag3 = false;
	}
}

function muda4(){
	if(flag4 == true){
		alvoCirculos(1)
		flag2 = true;
		flag4 = false;
	}
}


function RGBToHex(col){
    if(col.charAt(0)=='r'){
        col=col.replace('rgb(','').replace(')','').split(',');
        let r=parseInt(col[0], 10).toString(16);
        let g=parseInt(col[1], 10).toString(16);
        let b=parseInt(col[2], 10).toString(16);
        r=r.length==1?'0'+r:r; g=g.length==1?'0'+g:g; b=b.length==1?'0'+b:b;
        let colHex='#'+r+g+b;
        return colHex;
    }
}

/* funções de redução, para diminuir codigo */

function gId(id){
	return document.getElementById(id)
}

function c(mensagem){
	console.log(mensagem)
}