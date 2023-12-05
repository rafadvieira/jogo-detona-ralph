
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        timeLife:document.querySelector("#time-life"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime: 10,
        curretLife: 3,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function resultFinal (){
    
    if(state.values.curretLife <= 0 || state.values.curretTime <= 0) {
        playSound("gameOver");
        // limpa o tempo
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timeId);
        
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

function countLife (){
    state.values.curretLife--;
    
    state.view.timeLife.textContent = state.values.curretLife;

    resultFinal();
}

// função para contar o tempo do jogo
function countDown() {
    // diminui o tempo
    state.values.curretTime--;

    // atualiza o tempo visualmente
    state.view.timeLeft.textContent = state.values.curretTime;

    resultFinal();   
}

// função para tocar o audio
function playSound(audioName) {
    // guardar o audio
    let audio = new Audio(`./src/audios/${audioName}.m4a`);

    // volume do audio
    audio.volume = 0.2;

    // função para chamar o audio
    audio.play();
}

// função para sortear uma caixa aleatória para o ralph
function randomSquare() {
    // percorre e limpa todos os quadrados
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    // sorteia um quadrado aleatório
    let randomNumber = Math.floor(Math.random() * 9);

    // para pegar um quadrado aleatório
    let randomSquare = state.view.squares[randomNumber];

    // adiciona o inimigo no quadrado
    randomSquare.classList.add("enemy");

    // guarda o index do quadrado aleatório
    state.values.hitPosition = randomSquare.id;
}

/* função para movimentar o ralph no intervalo escolhido
function moveEnemy() {
    state.values.timeId = setInterval(randomSquare, state.values.gameVelocity);
}*/

// adicionar evento de click nas caixinhas
function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // se o queadrado clicado for igual ao quadrado do inimigo
            if (square.id === state.values.hitPosition) {
                // se acertou soma o resultado
                state.values.result++;
                // altera o score visualmente 
                state.view.score.textContent = state.values.result;
                // para zerar e guardar o inimigo noutro quadrado
                state.values.hitPosition = null;

                playSound("hit");
            } else {
                countLife();
            }
        })
    });
}

// função inicial para chamar as funções principais
function initialize() {
    //moveEnemy();
    addListenerHitBox();
}

initialize();