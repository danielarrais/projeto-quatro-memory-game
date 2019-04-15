// Atributo para armazenar os a lista de cartões não combinados
let cartoesNaoCombinados;

// Atributo para armazenar os a lista de cartões combinados
let cartoesCombinados;

// Atributo para armazenar o componente de exibição dos movimentos
const contadorDeMovimentosSpan = $('.moves');

// Atributo para armazenar o componente de reinicialização do jogo
const restartButton = $('.restart');

// Atributo para armazenar o componente de exibição dos resultados
const sucessModal = $('#modal-sucess');

// Atributo para armazenar o componente de exibição dos tempo de jogo
const timerSpan = $('.timer');

// Atributos para armazenar a quantidade de movimentos realizados
let contadorDeMovimentos;

// atributos para armazenar os dois cartões selecionados
let primeiroCartaoSelecionado;
let segundoCartaoSelecionado;

// atributos para manipulção do tempo jogado
let second = {
	value: 0,
	label: " segs"
};

let minute = {
	value: 0,
	label: " mins "
};

iniciarJogo();

/**
 * Método embaralha array
*/
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

/**
 * Método utilizado para iniciar o jogo
*/
function iniciarJogo(){
    reiniciarCartoes();
    zerarRelogio();
    iniciarContadorDeMovimentos();
    embaralharJogo();

    restartButton.on('click', iniciarJogo)
}

/**
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

/**
 * Revela a figura clicada
 *   - adiciona ou remove a class 'match' do elemento clicado
 *   - agenda a execução do método verificarCartoesSelecionados()
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

/**
 * Método que executa as ações necessárias quando há dois cartões selecionados
*/
function verificarCartoesSelecionados(){
    if(compararCartoesSelecionados()){
        atualizarListasDeCartoes();
    }
    fecharCartoesSelecionados()
    incrementarContadorDeMovimentos();
    habilitarCartoesNaoSelecionados();

    atualizarPlacar()
}

/**
 * Atualiza o placar e verifica se o jogo concluiu
 * de acordo com a quantidade de cartões não 
 * combinados e com a quantidade de movimentos
*/
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

/**
 * Altera o desempenho do jogador reduzindo a
 * quantidade de estrela de acordo com o valor solicitado
*/
function alterarDesempenho(des){
    const starGroups = $('.stars');
    if(des > 0 && des <= 3){
        for(starGroup of starGroups){
            const childs = starGroup.children;
            $($(childs[des]).children()[0]).removeClass('fa-star').addClass('fa-star-o');
        }
    }
}

/**
 * Compara os dois cartao selecionados
*/
function compararCartoesSelecionados(){
    if(primeiroCartaoSelecionado.attr('id') === segundoCartaoSelecionado.attr('id')){
        return true;
    }

    return false;
}

/**
 * Incrementa contagem de movimentos
*/
function incrementarContadorDeMovimentos(){
    if(contadorDeMovimentosSpan !== undefined){
        contadorDeMovimentos++;
        contadorDeMovimentosSpan.text(contadorDeMovimentos);
    }
}

/**
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

/**
 * Verifica se há dois cartões selecionados
 */
function temDoisCartoesSelecionados(){
    if(primeiroCartaoSelecionado !== undefined && segundoCartaoSelecionado !== undefined){
        return true;
    }
    return false;
}

/**
 * Atualiza as duas listas de cartões utilizadas para saber
 * os cartões abertos e os que faltam ser abertos
 */
function atualizarListasDeCartoes(){
    cartoesNaoCombinados = $('.card').not('.match')
    cartoesCombinados = $('.card.match')
}

/**
 * Fecha os dois cartões abertos, caso eles não sejam iguais
 */
function fecharCartoesSelecionados(){
    if(!compararCartoesSelecionados()){
        segundoCartaoSelecionado.removeClass('match');
        primeiroCartaoSelecionado.removeClass('match');
    }
    esquecerCartoesSelecionados();
}

/**
 * Reseta todos os cartões para o estado inicial
 */
function reiniciarCartoes(){
    cartoes = $('.card');

    esquecerCartoesSelecionados();

    for(cartao of cartoes){
        $(cartao).removeClass('match open')
    }

    cartoesNaoCombinados = cartoes;
}

/**
 * Abre a modal com o resultado do jogo
 */
function exibirModalResultado(){
    sucessModal.modal({
        close: reiniciarCartoes
    });
    $('.close-modal').on('click', reiniciarCartoes);
}

/**
 * Reseta os atributos que guardam os cartões selecionados pelo usuário
 */
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

/**
 * Atualiza o relógio da página
 */
function atualizarRelogio() {
    timerSpan.text(minute.value + minute.label + second.value + second.label);
}

/**
 * Zera o relógio
 */
function zerarRelogio() {
    second.value = 0;
    minute.value = 0;
    atualizarRelogio();
}

/**
 * Inicializa o relogio
 */
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