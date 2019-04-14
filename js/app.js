/*
 * Create a list that holds all of your cards
 */
const cards = $('.card');
const spanContadorDeMovimentos = $('.moves')

let contadorMovimentos = 0;

let primeiroCartaoSelecionado;
let segndoCartaoSelecionado;

prepararCards(cards);

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

function prepararJogo(){
    contadorMovimentos = 0;
    embaralharJogo(cards);
}

/*
 * Embaralha os cards passados
 *   - limpa o deck de cartas, embaralha as passadas e lança o novo arranjo
 *   - adiciona o evento click com a função de revelar o card a todos eles
 */
function embaralharJogo(cards){
    let deck = $('.deck')

    shuffle(cards);

    deck.empty();

    deck.append(cards)

    for(card of cards){
        $(card).on('click', revelarCartao)
    }
}

/*
 * Revela a figura clicada
 *   - adiciona ou remove a class 'match' do elemento clicado
 */
function revelarCartao(event){
    if(primeiroCartaoSelecionado === undefined || segndoCartaoSelecionado === undefined){
        cartaoClicado = $(event.target);
        if(primeiroCartaoSelecionado === undefined && !cartaoClicado.hasClass('match')){
            primeiroCartaoSelecionado = cartaoClicado;
        }else if(segndoCartaoSelecionado === undefined && !cartaoClicado.hasClass('match')){
            segndoCartaoSelecionado = cartaoClicado;
        }

        cartaoClicado.toggleClass('match');
        
        setTimeout(verificarCartoesSelecionados,1000);
    }
}

function verificarCartoesSelecionados(){
    if(primeiroCartaoSelecionado !== undefined && segndoCartaoSelecionado !== undefined){
        if(compararCartoesSelecionados()){
            primeiroCartaoSelecionado.unbind('click', revelarCartao);
            segndoCartaoSelecionado.unbind('click', revelarCartao);
        }else{
            segndoCartaoSelecionado.toggleClass('match');
            primeiroCartaoSelecionado.toggleClass('match');
        }
        primeiroCartaoSelecionado = undefined;
        segndoCartaoSelecionado = undefined;
        incrementarMovimentos();
    }
}

/*
 * Compara os dois card selecionados
*/
function compararCartoesSelecionados(){
    if(primeiroCartaoSelecionado.attr('id') === segndoCartaoSelecionado.attr('id')){
        return true;
    }

    return false;
}

/*
 * Incrementa contagem de movimentos
*/
function incrementarMovimentos(){
    if(spanContadorDeMovimentos !== undefined){
        const count = spanContadorDeMovimentos.text();
        spanContadorDeMovimentos.text(count + 1);
    }
}

