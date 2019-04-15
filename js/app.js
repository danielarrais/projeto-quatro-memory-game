/*
 * Create a list that holds all of your cartoes
 */
let cartoesNaoCombinados;

let cartoesCombinados;

const contadorDeMovimentosSpan = $('.moves');
const restartButton = $('.restart');
const sucessModal = $('#modal-sucess');
const timerSpan = $('.timer');

let contadorDeMovimentos;

let primeiroCartaoSelecionado;
let segundoCartaoSelecionado;

// declaring second and minute
let second = {
	value: 0,
	label: " segs"
};

let minute = {
	value: 0,
	label: " mins "
};

iniciarJogo();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function iniciarJogo(){
    reiniciarCartoes();
    iniciarContadorDeMovimentos();
    embaralharJogo();

    restartButton.on('click', iniciarJogo)
}

/*
 * Embaralha os cartoes passados
 *   - limpa o deck de cartas, embaralha as passadas e lança o novo arranjo
 *   - adiciona o evento click com a função de revelar o cartao a todos eles
 */
function embaralharJogo(){
    let deck = $('.deck')

    shuffle(cartoesNaoCombinados);

    deck.empty();

    deck.append(cartoesNaoCombinados)

    for(cartao of cartoesNaoCombinados){
        $(cartao).on('click', revelarCartao)
    }
}

/*
 * Revela a figura clicada
 *   - adiciona ou remove a class 'match' do elemento clicado
 */
function revelarCartao(event){
    if(!temDoisCartoesSelecionados()){
        iniciarRelogio();
        cartaoClicado = $(event.target);

        if(!cartaoClicado.hasClass('open')){
            cartaoClicado.toggleClass('open')
        }
        
        if(primeiroCartaoSelecionado === undefined && !cartaoClicado.hasClass('match')){
            primeiroCartaoSelecionado = cartaoClicado;
        }else if(segundoCartaoSelecionado === undefined && !cartaoClicado.hasClass('match')){
            segundoCartaoSelecionado = cartaoClicado;
        }
        
        cartaoClicado.toggleClass('match');

        if(temDoisCartoesSelecionados()){
            desabilitarClickDosCartoes();
            setTimeout(verificarCartoesSelecionados, 1500);
        }
        
    }
}

function verificarCartoesSelecionados(){
    if(compararCartoesSelecionados()){
        atualizarListasDeCartoes();
    }
    fecharCartoesSelecionados()
    incrementarContadorDeMovimentos();
    habilitarCartoesNaoSelecionados();

    atualizarPlacar()
}

function atualizarPlacar(){
    if(cartoesNaoCombinados.length === 0){
        exibirModalResultado();
    }

    if(contadorDeMovimentos >= 10){
        alterarDesempenho(2)
    }

    if(contadorDeMovimentos >= 15){
        alterarDesempenho(1)
    }
}

function alterarDesempenho(des){
    const starGroups = $('.stars');
    if(des > 0 && des <= 3){
        for(starGroup of starGroups){
            const childs = starGroup.children;
            $($(childs[des]).children()[0]).removeClass('fa-star').addClass('fa-star-o');
        }
    }
}

/*
 * Compara os dois cartao selecionados
*/
function compararCartoesSelecionados(){
    if(primeiroCartaoSelecionado.attr('id') === segundoCartaoSelecionado.attr('id')){
        return true;
    }

    return false;
}

/*
 * Incrementa contagem de movimentos
*/
function incrementarContadorDeMovimentos(){
    if(contadorDeMovimentosSpan !== undefined){
        contadorDeMovimentos++;
        contadorDeMovimentosSpan.text(contadorDeMovimentos);
    }
}

/*
 * Incrementa contagem de movimentos
*/
function iniciarContadorDeMovimentos(){
    contadorDeMovimentos = 0;
    contadorDeMovimentosSpan.text(contadorDeMovimentos);
}

/**
 * Desabilita a função click de todos os cartoes
 */
function desabilitarClickDosCartoes(){
    for(cartao of cartoesNaoCombinados){
        cartao = $(cartao);
        cartao.unbind('click', revelarCartao);
        cartao.toggleClass('disabled');
    }
}

/**
 * Habilita a função click de todos os cartoes não selecionados
 */
function habilitarCartoesNaoSelecionados(){
    for(cartao of cartoesNaoCombinados){
        cartao = $(cartao);
        cartao.on('click', revelarCartao);
        cartao.toggleClass('disabled');
    }

    if(cartoesCombinados !== undefined){
        for(cartao of cartoesCombinados){
            $(cartao).unbind('click', revelarCartao);
        }
    }
}

function temDoisCartoesSelecionados(){
    if(primeiroCartaoSelecionado !== undefined && segundoCartaoSelecionado !== undefined){
        return true;
    }
    return false;
}

function atualizarListasDeCartoes(){
    cartoesNaoCombinados = $('.card').not('.match')
    cartoesCombinados = $('.card.match')
}

function fecharCartoesSelecionados(){
    if(!compararCartoesSelecionados()){
        segundoCartaoSelecionado.removeClass('match');
        primeiroCartaoSelecionado.removeClass('match');
    }
    esquecerCartoesSelecionados();
}

function reiniciarCartoes(){
    cartoes = $('.card');

    esquecerCartoesSelecionados();

    for(cartao of cartoes){
        $(cartao).removeClass('match open')
    }

    cartoesNaoCombinados = cartoes;
}

function exibirModalResultado(){
    sucessModal.modal({
        close: reiniciarCartoes
    });
    $('.close-modal').on('click', reiniciarCartoes);
}

function esquecerCartoesSelecionados(){
    if(primeiroCartaoSelecionado !== undefined){
        primeiroCartaoSelecionado.removeClass('open')
        primeiroCartaoSelecionado = undefined;
    }
    if(segundoCartaoSelecionado !== undefined){
        segundoCartaoSelecionado.removeClass('open')
        segundoCartaoSelecionado = undefined;
    }
}

// refresh timer in HTML
function atualizarRelogio() {
	timerSpan.text(minute.value + minute.label + second.value + second.label);
}

// reset timer
function zerarRelogio() {
	second.value = 0;
	minute.value = 0;
	atualizarRelogio();
}

// start timer
function iniciarRelogio() {
		interval = setInterval(function() {
			second.value++;
			if(second.value == 60) {
				minute.value++;
				second.value = 0;
			}
			atualizarRelogio();
		}, 1000);
}