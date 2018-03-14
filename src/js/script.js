/* iniciar o script após o carregamento da 'pagina'. */
window.addEventListener('DOMContentLoaded', iniciar)

function iniciar(){

	/* variveis de configuração, adicionar mais configurações. */
	config = {
		'cor':{alvo:'#000000', 'vizinho':'#C0C0C0'},
		'circulos': {
			'quantidade':10, 
			'alvo-inicial':0,			
			'width': '80px',
			'height': '80px',
		},
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
		'alvo-atual': false,
	}

	controle = []

	tempos = []

	gId('interface-iniciar').addEventListener('click', interfaceConfig)

	gId('menu').addEventListener('click', function(){ gId('slot-interface-config').style.display = 'block'; })
}

function iniciarApp(){	
	adicionarCirculos(
		config['circulos']['quantidade'], 

		document.getElementById("fundo")
	)

	circulos = elementosCirculo()

	atualizarCirculos()

	adicionarEventos()
	
	controleAlvos("iniciar")

}

function interfaceConfig(){
	config['cor']['alvo'] = gId('cor-alvo').value
	config['cor']['vizinho'] = gId('cor-vizinho').value

	config['circulos']['quantidade'] = parseInt(gId('quantidade').value)
	config['circulos']['alvo-inicial'] = parseInt(gId('alvo-inicial').value)		

	config['circulos']['width'] = config['circulos']['height'] = parseInt(gId('diametro-alvo').value) + "px";

	config['circulos']['diametro-area'] = parseInt(gId('diametro-area').value);

	/* 
		Configurações não usadas. 

		config['circulos']['width'] = parseInt(gId('width').value) + "px";
		config['circulos']['height'] = parseInt(gId('height').value) + "px";
		
		config['circulos']['quantidade-minima'] = parseInt(gId('quantidade-minima').value)
		config['circulos']['quantidade-maxima'] = parseInt(gId('quantidade-maxima').value)
	*/

	config['sequencia'] = gId('sequencia').value

	gId('slot-interface-config').style.display = 'none';

	iniciarApp()
}

function adicionarEventos(){
	let circulos = document.getElementsByClassName("circulo")
		let fundo = document.getElementById("teste");
	for (let i = 0; i < circulos.length; i++) {
		circulos[i].addEventListener(
			'click',
			function(){ controleAlvos(i) }
		);
	}
		fundo.addEventListener(
		'click',
		function(){ controleAlvos("div-fundo") }
	);

}

/* FUNÇÃO MATHEUS */

/* saida => o html/div onde os circulos vão ser renderizados*/
/* exemplo de chamda da função: adicionarCirculos(12, document.getElementById("fundo")) */
function adicionarCirculos(quantidadeCirculos, saida){
	let fundo = document.createElement("div");
	fundo.className = "teste";
	fundo.id = "teste";
	
	saida.appendChild(fundo);

	if(quantidadeCirculos < 4 || quantidadeCirculos > 20){
		c("Quantidade informada está fora dos limites.");
	}
	else{
		for(let i = 0; i < quantidadeCirculos; i++){
			let circulo = document.createElement("div");
			/* 									(quantidadeElementos, raio, lar, alt ) */

			let raio = config['circulos']['diametro-area'] / 2;
			let posicoesCirculos = coordElements(quantidadeCirculos, raio, raio, raio);

			circulo.setAttribute("style", 
				"position: absolute;" +
				"left:" + posicoesCirculos[i].x + "px;"+
				"top: "+ posicoesCirculos[i].y + "px;"+
				"width: " + config['circulos']['width'] + ";" +
				"height: " + config['circulos']['height'] + ";" +
				"background: " + config['cor']['vizinho'] + ";"
			);			

			circulo.className = "circulo";

			circulo.setAttribute("id", i);

			saida.appendChild(circulo);			
		}		
	}
}

function alvoCirculos(indiceAlvo){
	subirCirculos(indiceAlvo)
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
/* comandos para salvar tempo e milimetros
	var antes = Date.now();
	var duracao = Date.now() - antes;
*/
var antes = Date.now();
function controleAlvos(indice){
	if(indice == estado['alvo-atual']){
		controle[controle.length] = {"status":'acerto', "tempo": Date.now()}
		c("Alvo clicado: "+ indice+", Alvo atual (alvo certo): "+ estado['alvo-atual'])
	}
	else if(indice == "iniciar")
		c("Teste iniciado:")
	else{
		c("Alvo clicado: "+ indice+", Alvo atual (alvo certo): "+ estado['alvo-atual'])
		controle[controle.length] = {"status":'erro', "tempo": Date.now()}
	}

	condicao = (config['circulos']['quantidade'] - 1) / 2
	if(estado['alvo-atual'] == condicao){
		c("teste encerrado")
		finalizarTeste()
	}

	if(config['sequencia'] == 'sequencial'){

		c("ordem sequencial");	

		if(estado['proximo-alvo'] >= circulos['quantidade']){
			estado['proximo-alvo'] = 0
			c('fechou o ciclo')
		}

		alvoCirculos(estado['proximo-alvo'])

		estado['alvo-atual'] = estado['proximo-alvo']

		estado['proximo-alvo'] ++;
	}

	else if( config['sequencia'] == 'aleatoria' ){
		c("ordem ainda não desenvolvida")

	}

	else if( config['sequencia'] == 'extremo-oposto' ){

		alvoCirculos(estado['proximo-alvo'])

		estado['alvo-atual'] = estado['proximo-alvo']
		
		estado['proximo-alvo'] = parseInt( config['circulos']['quantidade'] / 2 ) + estado['alvo-atual'] + 1

		if(estado['proximo-alvo']>config['circulos']['quantidade'] - 1){
			if(circulos['quantidade'] % 2 == 0){
				estado['proximo-alvo'] = estado['proximo-alvo'] - config['circulos']['quantidade'] -1
			}
			else {
				estado['proximo-alvo'] = estado['proximo-alvo'] - config['circulos']['quantidade'] 
			}
		}	
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

function finalizarTeste(){
	let caixa = gId("caixa")
	let aviso = gId("aviso")
	let init = gId("init")
	aviso.setAttribute("style", "display:block;")
	init.setAttribute("style", "display:block;")
	caixa.setAttribute("style", "display: block;")
	var t = document.createTextNode(JSON.stringify(controle)) 
	caixa.appendChild(t);
	gId("fundo").remove(); 
}

function subirCirculos(indice){
	for(let i = 0; i < config['circulos']['quantidade']; i++){
		gId(i).style.zIndex = "1";
	}
	gId(indice).style.zIndex = "2";
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

/* função de calculos matematicas */

/* Adriano Ferreira, 2018 */

/* exemplo da chamada da função: coordElements(12, 200, 800, 800) */
function coordElements (quantidadeElementos, raio, lar, alt ) {
	/* raio -> distancia entre o centro da tela e os circulos */
	/* largura da tela/div */
	/* altura da tela/div */
	
	let circunferencia = 360;
	let angulo_inicial = circunferencia/quantidadeElementos;
	let coeficiente = 0;
	let resultado = [];

	for (let i = 0, angulo = angulo_inicial; angulo<=360; angulo+=angulo_inicial, i++){
		x = undefined;
		y = undefined;
		
		if ( angulo == 90 ){
			x = 0;
			y = raio;
		}
		else if ( angulo == 270){
			x = 0;
			y = -raio;
		} // -- casos em que o coeficiente angular(tangente) é infinito
	
		else {
		(angulo == 180 || angulo == 360)?coeficiente = 0: coeficiente = Math.tan( angulo * Math.PI/180 ); // Casos em que é 0 
		}
		
		if ( typeof x == 'undefined'){
			x = Math.pow(raio,2)/(Math.pow(coeficiente,2)+1); //
			x = Math.sqrt(x);
			y = coeficiente*x;
		}
					
		/* Devido ao fato de que inverte-se os lados */
		if (angulo>90 && angulo<270){
			x *= -1;
			y *= -1;
		}
	
		//------ fim do sistema
		d = Math.pow(x,2) + Math.pow(y,2); // distancia considerando ponto inicial (0,0);
		d = Math.sqrt(d);
		//c("Angulo: "+angulo+" x: " + x + " y: "+y);
		//c("Coeficiente: "+coeficiente);
		//c("distancia: "+d); // valor do inicial ate o angulo de 90, adaptar para o circulo
	 
		x+=lar; // Adaptando para pontos nao nulos
		y+=alt;

		resultado[i] = {}
		resultado[i]['x'] = x;
		resultado[i]['y'] = y;
	
	}
	return resultado;
}
