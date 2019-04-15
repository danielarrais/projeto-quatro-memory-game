
# Jogo da Memória

## O que é
É um jogo simples de cartas, usado para testar a memória dos jogadores. Este jogo foi criado como projeto de conclusão do [**Programa Nanodegree Fundamentos Web Front-End**](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) da **[Udacity](udacity.com)**

## Como jogar

 1. Para iniciar o jogo basta clicar em uma carta. 
 2. O objetivo é encontrar todos os pares de carta e para isso basta abrir duas cartas e ver se elas são iguais. Caso as duas não sejam o sistema as fechará e caso sejam continuaram abertas e você deverá tentar encontrar o próximo par.
 3. Você poderá tentar novamente até que consiga encontrar todos os pares.

## Desafio
Encontrar todos os pares de cartões com o uso da menor quantidade  de movimentos que você conseguir.

> **Dica:** use bem sua memória!

## Pontuação
* 1 estrela por encontrar todos os pares;
* 2 estrelas por encontrar todos os pares com até 10 movimentos.
* 3 estrelas por encontrar todos os pares com até 15 movimentos.

## Como construí o jogo
* Utilizei [**HTML**](https://github.com/danielarrais/projeto-quatro-memory-game/blob/master/index.html), [**CSS**](https://github.com/danielarrais/projeto-quatro-memory-game/blob/master/css/app.css) e para estruturar o tabuleiro com as cartas;
* E  utilizei a [**biblioteca jQuery**](https://jquery.com) para desenvolver toda a lógica do jogo e manipulação dos componentes HTML. Toda a programação pode ser encontrada no arquivo [**app.js**](https://github.com/danielarrais/projeto-quatro-memory-game/blob/master/js/app.js).
* Criei um deck de 8 pares de cartas (16 cartas) que é embaralhado sempre que a página é carregada ou o botão reiniciar é clicado;
* Adicionei um contador de movimentos para tornar o jogo mais desafiante;
* Adicionei um temporizador para saber a duração do jogo;
* Adicionei uma animação de pulse ao abrir a carta utilizando CSS3;
* Criei uma janela pop-up utilizando o plugin  [**jQuery Modal**](https://jquerymodal.com/) que é exibida ao vencer, parabenizando o jogador. 


## Créditos

O conteúdo estático deste projeto foi disponibilizado pela **[Udacity](udacity.com)** para todos os alunos do [**Programa Nanodegree Fundamentos Web Front-End**](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001) no seu **[repositório](https://github.com/udacity/fend-project-memory-game)**. 