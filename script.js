
const botao = document.getElementById("start-btn");
const telaInicio = document.getElementById("start-screen");
const telaJogo = document.getElementById("quiz-screen");

let pontuacao = 0;
let perguntas = [];
let indice = 0;

botao.addEventListener("click", () => {
    gerarPergunta(); // 1. Chama a função para buscar as perguntas
});

async function gerarPergunta () {
    try {
        const URL = await fetch ("https://opentdb.com/api.php?amount=5&type=multiple");
        const dados = await URL.json();

        perguntas = dados.results;

        // 1. ESCONDE A TELA INICIAL SÓ DEPOIS QUE A API RESPONDER
        telaInicio.classList.remove("active");
        telaInicio.classList.add("hidden"); 
        
        // 2. MOSTRA A TELA DO JOGO
        telaJogo.classList.add("active");
        telaJogo.classList.remove("hidden"); 
        
        mostrarPergunta();

    } catch (error) {
        console.log(error)
    }
}

function mostrarPergunta (){
    const elemento = perguntas[indice];

    const errada1 = elemento.incorrect_answers[0];
    const errada2 = elemento.incorrect_answers[1];
    const errada3 = elemento.incorrect_answers[2];
    const certa = elemento.correct_answer;

    telaJogo.innerHTML = `
        <div class="quiz-header">
            <span id="question-counter">Pergunta ${indice + 1}/5</span>
            <span id="score-display">Pontos: ${pontuacao}</span>
        </div>
        
        <h2 id="question-text">${elemento.question}</h2>
        
        <div id="answer-buttons" class="answers-grid">
            <button class="btn-answer" onclick="verificar('errada')">${errada2}</button>
            <button class="btn-answer" onclick="verificar('errada')">${errada1}</button>
            <button class="btn-answer" onclick="verificar('certa')">${certa}</button>
            <button class="btn-answer" onclick="verificar('errada')">${errada3}</button>
        </div>
    `;
}

function verificar(resposta) {
    if (resposta === 'certa') {
        pontuacao = pontuacao + 1; // Soma 1 ponto
    } 

    indice = indice + 1;
    if (indice < 5){
        mostrarPergunta();
    } else {
        telaJogo.innerHTML = `
            <div id="end-screen" class="screen active"> <h2>Fim de Jogo!</h2>
                <p>Sua pontuação final foi:</p>
                <h1 id="final-score" class="score-highlight">${pontuacao}/5</h1> 
                <button id="restart-btn" class="btn-primary" onclick="location.reload()">Jogar Novamente</button>
            </div>
        `
    }
    const visor = document.querySelectorAll("#score-display");

    visor.forEach(elemento => {
        elemento.innerHTML = `Pontos: ${pontuacao}`;
    })
}