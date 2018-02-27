/* iniciar o script após o carregamento da 'pagina'. */
window.addEventListener('DOMContentLoaded', iniciar)


function iniciar(){

	/* variveis de configuração, adicionar mais configurações. */
	config = {
		'cor':{alvo:'#000000', 'vizinho':'#C0C0C0'},
		'circulos': {'quantidade':10, 'alvo-inicial':0},
		'sequencia': '',
		'ambiente': '',
	}
	
	/* config['sequencia'] = 'sequencial' || 'aleatoria' || 'extremo-oposto' */
	config['sequencia'] = 'sequencial'

	/* config['ambiente'] = 'desenvolvimento' || 'homologacao' || 'producao' */
	config['ambiente'] = 'desenvolvimento'

	estado = {
		'proximo-alvo':0,
		'cliques': 0,
	}

	circulos = elementosCirculo()
	atualizarCirculos()

	adicionarEventos()

	controleAlvos()
}

function adicionarEventos(){
	let circulos = document.getElementsByClassName("circulo")
	for (let i = 0; i < circulos.length; i++) {
		circulos[i].addEventListener(
			'click',
			function(){ controleAlvos(i) }
		);

	}

}

function alvoCirculos(indiceAlvo){
	for (let i = 0; i < circulos['quantidade']; i++) {			
		
		if(i == indiceAlvo){
			circulos[i]['cor'] = config['cor']['alvo']
		}else{
			circulos[i]['cor'] = config['cor']['vizinho']
		}
	}

	atualizarCirculos()	
}

function atualizarCirculos(){
	let circulosDOM = document.getElementsByClassName("circulo")

	for (let i = 0; i < circulos['quantidade']; i++) {
		circulosDOM[i].style.backgroundColor = circulos[i]['cor']
	}
}

function controleAlvos(indice){

	c('indice do elemento clicado: ' + indice)
	c('verificar se o indice do elemento clicado é igual ao atual, se sim foi um clique correto')

	if(config['sequencia'] == 'sequencial'){

		c("ordem sequencial");	

		if(estado['proximo-alvo'] >= circulos['quantidade'])
			estado['proximo-alvo'] = 0


		alvoCirculos(estado['proximo-alvo'])

		estado['alvo-atual'] = estado['proximo-alvo'];

		/* sequencial */
		estado['proximo-alvo'] ++;

	}

	else if( config['sequencia'] == 'aleatoria' ){
		c("ordem ainda não desenvolvida")
	}

	else if( config['sequencia'] == 'extremo-oposto' ){
		c("ordem ainda não desenvolvida")
	}
}

function elementosCirculo(){
	let el = {}

	let circulos = document.getElementsByClassName("circulo")

	el['quantidade'] = document.getElementsByClassName("circulo").length
	
	for (let i = 0; i < circulos.length; i++) {	
		el[i] = {}
		el[i]['cor'] = circulos[i].style.backgroundColor || config['cor']['vizinho']
	}

	return el
}

/* funções de conversão */

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

function gId(id){return document.getElementById(id)}

function c(mensagem){
	if(config['ambiente'] == 'desenvolvimento'){
		console.log(mensagem)
	}	
}