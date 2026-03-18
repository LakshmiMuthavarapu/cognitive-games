let shapes = ["┐","┘","└","┌"];

let score = 0;
let points = 1;

let totalQuestions = 35;
let currentQuestion = 0;

let roundTime = 5;
let timer;

let trial = true;

let target = document.getElementById("target");
let options = document.getElementById("options");

let scoreElement = document.getElementById("score");
let starsElement = document.getElementById("stars");
let trialElement = document.getElementById("trial");
let timerBar = document.getElementById("timerProgress");


/* ---------- STARS ---------- */

function updateStars(){
    starsElement.innerText = "⭐".repeat(points);
}

updateStars();


/* ---------- TRIAL ROUND ---------- */

newQuestion();

setTimeout(()=>{
    trial = false;
    trialElement.innerText = "Real Round";
    startRound();
},5000);


/* ---------- ROUND SYSTEM ---------- */

function startRound(){

    if(currentQuestion >= totalQuestions){
        finishGame();
        return;
    }

    roundTime = 5;
    timerBar.style.width = "100%";

    newQuestion();

    clearInterval(timer);

    timer = setInterval(()=>{

        roundTime--;

        timerBar.style.width = (roundTime/5)*100 + "%";

        if(roundTime <= 0){

            clearInterval(timer);

            // ❗ Missed click penalty
            points = 1;
            updateStars();

            score = Math.max(0, score - 2);
            scoreElement.innerText = score;

            trialElement.innerText = "⏱️ Missed! Be faster!";

            currentQuestion++;

            setTimeout(startRound, 400);
        }

    },1000);
}


/* ---------- QUESTION ---------- */

function newQuestion(){

    options.innerHTML = "";

    let correct = shapes[Math.floor(Math.random()*shapes.length)];

    target.innerText = correct;

    let optionList = [correct];

    while(optionList.length < 4){

        let s = shapes[Math.floor(Math.random()*shapes.length)];

        if(!optionList.includes(s)){
            optionList.push(s);
        }

    }

    optionList.sort(()=>Math.random()-0.5);

    optionList.forEach(o=>{

        let div = document.createElement("div");

        div.className = "opt";
        div.innerText = o;

        div.onclick = function(){

            clearInterval(timer);

            if(o === correct){

                if(!trial){
                    score += points;

                    if(points < 5){
                        points++;
                    }

                    scoreElement.innerText = score;
                    updateStars();
                }

            }else{

                // ❗ Wrong click penalty
                points = 1;
                updateStars();

                score = Math.max(0, score - 1);
                scoreElement.innerText = score;
            }

            currentQuestion++;

            setTimeout(startRound, 400);
        };

        options.appendChild(div);

    });

}


/* ---------- FINAL RESULT ---------- */

function finishGame(){

    clearInterval(timer);

    options.innerHTML = "";

    document.getElementById("gameTitle").innerText = "Assessment Result";

    if(score >= 80){

        options.innerHTML = `
            <div style="text-align:center;">
                <h2>🎉 Game 2 Passed!</h2>
                <p>Great mental rotation skills!</p>
                <p><b>Your Score: ${score}</b></p>
            </div>
        `;

    }else{

        options.innerHTML = `
            <div style="text-align:center;">
                <h2>❌ Game Over</h2>
                <p>Minimum score 80 required</p>
                <p><b>Your Score: ${score}</b></p>
                <button onclick="restartGame()">Try Again</button>
            </div>
        `;
    }
}


/* ---------- RESTART ---------- */

function restartGame(){
    location.reload();
}
