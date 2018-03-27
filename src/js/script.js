/* iniciar o script após o carregamento da 'pagina'. */
window.addEventListener('DOMContentLoaded', iniciar)

function iniciar(){

	/* variveis de configuração, adicionar mais configurações. */
	config = {
		'cor':{alvo:'#000000', 'vizinho':'#C0C0C0'},
		'circulos': {
			'quantidade':10, 
			'alvo-inicial':0
		},
		'sequencia': '',
		'ambiente': '',
		'feedback-sonoro':{
			'click-acerto': new Audio ('sounds/sound1-correct.mp3'),
			'click-erro': new Audio ('sounds/sound1-incorrect.mp3')
		}
	}
	
	/* config['sequencia'] = 'sequencial' || 'aleatoria' || 'extremo-oposto' */
	config['sequencia'] = 'sequencial'

	/* config['ambiente'] = 'desenvolvimento' || 'homologacao' || 'producao' */
	config['ambiente'] = 'desenvolvimento'

	estado = {
		'proximo-alvo':0,
		'alvo-atual': false,
	}

	controlef = []

	resultado = []


	gId('interface-iniciar').addEventListener('click', interfaceConfig)

	gId('menu').addEventListener('click', function(){ 
		if(statusAlvo == 2)
			if(statusArea == 1)
				return false

			else
			{
				statusArea++
				statusAlvo = 0
			}
		else
			statusAlvo++
		iniciarApp()		
	})
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

	/* gravel */
	if(config['gravel']){
		graveEls = getElements()
	}

}

function interfaceConfig(){
	diametroAlvos = gId("diametro-alvo").value
	diametroArea = gId("diametro-area").value
	vAlvos = diametroAlvos.split(" ")
	vArea = diametroArea.split(" ")
	statusArea = 0;
	statusAlvo = 0;
	if(vAlvos.length != 3 && vArea != 2){
		alert("Digite um numero valido de testes.")
		cf("Digite um numero valido de testes.")
		return false
	}
	config['cor']['alvo'] = gId('cor-alvo').value
	config['cor']['vizinho'] = gId('cor-vizinho').value

	config['circulos']['quantidade'] = parseInt(gId('quantidade').value)
	config['circulos']['alvo-inicial'] = parseInt(gId('alvo-inicial').value)		

	config['circulos']['diametro'] = gId('diametro-alvo').value.split(" ");

	config['circulos']['diametro-area'] = gId('diametro-area').value.split(" ");

	config['sequencia'] = gId('sequencia').value

	config['gravel'] = gId("gravel").checked;

	config['feedback-sonoro']['status'] = gId("feedback-sonoro").checked;

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
	let paiCirculos = document.createElement("div")
	saida.appendChild(paiCirculos)
	paiCirculos.className = "paiCirculos"
	paiCirculos.id = "paiCirculos"
	paiCirculos.setAttribute("style", "width: 100%; height: 100%; margin: 0; padding: 0; border: 0;");
	
	

	let fundo = document.createElement("div")
	fundo.className = "teste"
	fundo.id = "teste"
	fundo.setAttribute("style", "width: " + screen.width + 
		"px; height: " + screen.height + "px;")
	
	document.getElementById("paiCirculos").appendChild(fundo)

	if(quantidadeCirculos < 4 || quantidadeCirculos > 20){
		cf("Quantidade informada está fora dos limites.");
	}
	else{
		for(let i = 0; i < quantidadeCirculos; i++){
			let circulo = document.createElement("div");
			/* 									(quantidadeElementos, raio, lar, alt ) */

			let raio = config['circulos']['diametro-area'][statusArea] / 2;
			w = gId("fundo").offsetWidth;
			h = gId("fundo").offsetHeight;
			let posicoesCirculos = coordElements(quantidadeCirculos, raio, parseInt(w/2), parseInt(h/2), parseInt(config['circulos']['diametro'])/2);

			circulo.setAttribute("style", 
				"position: absolute;" +
				"left:" + posicoesCirculos[i].x + "px;"+
				"top: "+ posicoesCirculos[i].y + "px;"+
				"width: " + config['circulos']['diametro'][statusAlvo] + "px;" +
				"height: " + config['circulos']['diametro'][statusAlvo] + "px;" +
				"background: " + config['cor']['vizinho'] + ";"
				);			

			circulo.className = "circulo";
			circulo.setAttribute("id", i);
			document.getElementById("paiCirculos").appendChild(circulo);			
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

function controleAlvos(indice){
	/* click acerto: o usuario clicou no alvo corretamente */
	if(indice == estado['alvo-atual']){
		
		cf("Alvo clicado: "+ indice+", Alvo atual (alvo certo): "+ estado['alvo-atual'])
		
		controlef[controlef.length] = {"status":true, "tempo": Date.now() - antes}

		if(config['feedback-sonoro']['status']){
			config['feedback-sonoro']['click-acerto'] = new Audio ('sounds/sound1-correct.mp3')
			config['feedback-sonoro']['click-acerto'].play()
		}
		
	}
	else if(indice == "iniciar"){
		cf("Teste iniciado:")
	}
	
	/* click erro: o usuario não clicou no alvo */
	else{

		cf("Alvo clicado: "+ indice+", Alvo atual (alvo certo): "+ estado['alvo-atual'])

		controlef[controlef.length] = {"status":false, "tempo": Date.now() - antes}

		if(config['feedback-sonoro']['status']){
			config['feedback-sonoro']['click-erro'] = new Audio ('sounds/sound1-incorrect.mp3')
			config['feedback-sonoro']['click-erro'].play()
		}
	}
	
	antes = Date.now();

	condicao = (config['circulos']['quantidade'] - 1) / 2
	if(estado['alvo-atual'] == condicao){
		cf("teste encerrado")
		estado['alvo-atual'] = 0;
		finalizarTeste()
	}

	if(config['sequencia'] == 'sequencial'){

		cf("ordem sequencial");	

		if(estado['proximo-alvo'] >= circulos['quantidade']){
			estado['proximo-alvo'] = 0
			cf('fechou o ciclo')
		}

		alvoCirculos(estado['proximo-alvo'])

		estado['alvo-atual'] = estado['proximo-alvo']

		estado['proximo-alvo'] ++;
	}

	else if( config['sequencia'] == 'aleatoria' ){
		cf("ordem ainda não desenvolvida")
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


function computarResultados(){
	acertos = 0
	erros = 0
	pa = 0
	pe = 0
	ta = 0
	te = 0
	tr = 0
	for(i=0; i < config['circulos']['quantidade']; i++){
		if(controlef[i]['status'] == true){
			acertos++
			if(i != 0)
				ta += controlef[i]['tempo']
		}
		else{
			erros++
			if(i != 0)
				te += controlef[i]['tempo']
		}
	}
	total = acertos + erros
	tr = te + ta
	pa = 100 * acertos / total
	pe = 100 - pa
	//ta /= acertos
	//te /= erros
	tr = tr / (total - 1)
	resultado = {"acertos": acertos, "erros": erros, 
	//"TMacertos": parseInt(ta.toFixed(5)), 
	//"TMerros": parseInt(te.toFixed(5)),
	"TM": parseInt(tr.toFixed(5)), 
	"PCA": parseFloat(pa.toFixed(2)), 
	"PCE": parseFloat(pe.toFixed(2)),
	"Fase:": 'D: ' + config['circulos']['diametro-area'][statusArea] + ' A: ' + config['circulos']['diametro'][statusAlvo]
}	
}

var contagem = 0
function finalizarTeste(){
	computarResultados()
	let caixa = gId("caixa")
	let aviso = gId("aviso")
	let menu = gId("menu")
	menu.setAttribute("style", "display:block;")
	if(contagem == 0)
		var t = document.createTextNode("[" + JSON.stringify(resultado) + ",") 
	else if(contagem < 5)
		var t = document.createTextNode(JSON.stringify(resultado) + ",")
	else{
		var t = document.createTextNode(JSON.stringify(resultado) + "]")
		caixa.setAttribute("style", "display: block;")
		aviso.setAttribute("style", "display:block;")		
	}
	contagem++
	
	caixa.appendChild(t)	

	gId("paiCirculos").remove()
	controlef = []
}

function processarDados(){
	console.log('processando dados');
	saidaNaoProcessada = gId("caixa").value
	gId("caixa").value = saidaNaoProcessada.replace(/\./g,",")
}

function subirCirculos(indice){
	for(let i = 0; i < config['circulos']['quantidade']; i++){
		gId(i).style.zIndex = "1";
		gId(i).setAttribute("class", "circulo")
	}
	gId(indice).style.zIndex = "2";
	if(config['gravel']){
		gId(indice).setAttribute("class", "circulo gravel")
		graveEls = getElements()
	}

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

function cf(mensagem){
	if(config['ambiente'] == 'desenvolvimento'){
		console.log(mensagem)
	}	
}

/* função de calculos matematicas */

/* Adriano Ferreira, 2018 */

/* exemplo da chamada da função: coordElements(12, 200, 800, 800) */
function coordElements (quantidadeElementos, distancia, lar, alt, raio ) {
	/* distancia -> distancia entre o centro da tela e os circulos */
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
			y = distancia;
		}
		else if ( angulo == 270){
			x = 0;
			y = -distancia;
		} // -- casos em que o coeficiente angular(tangente) é infinito

		else {
		(angulo == 180 || angulo == 360)?coeficiente = 0: coeficiente = Math.tan( angulo * Math.PI/180 ); // Casos em que é 0 
	}

	if ( typeof x == 'undefined'){
			x = Math.pow(distancia,2)/(Math.pow(coeficiente,2)+1); //
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
		//cf("Angulo: "+angulo+" x: " + x + " y: "+y);
		//cf("Coeficiente: "+coeficiente);
		//cf("distancia: "+d); // valor do inicial ate o angulo de 90, adaptar para o circulo



		x+=lar; // Adaptando para pontos nao nulos
		y+=alt;

		x-=raio;
		y-=raio;

		resultado[i] = {}
		resultado[i]['x'] = x;
		resultado[i]['y'] = y;
		cf("raio"+distancia);
	}
	return resultado;
}
