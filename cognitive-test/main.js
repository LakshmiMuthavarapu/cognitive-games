let score = 0;
let points = 1;

let targetNumber = 10;

let totalQuestions = 36;   // 36 × 5 sec ≈ 180 sec
let currentQuestion = 0;

let roundTime = 5;

let gameArea = document.getElementById("gameArea");
let targetElement = document.getElementById("target");
let scoreElement = document.getElementById("score");
let starsElement = document.getElementById("stars");
let trialElement = document.getElementById("trial");
let timerBar = document.getElementById("timerProgress");

let correctClicked = false;
let timer = null;

/* ---------- stars ---------- */

function updateStars(){
starsElement.innerText = "⭐".repeat(points);
}

updateStars();

/* ---------- trial round ---------- */

function startTrial(){

targetNumber = 10;
targetElement.innerText = targetNumber;

trialElement.innerText =
"Trial Round: Click the bubble that equals the target number";

spawnBubbles();

setTimeout(()=>{

trialElement.innerText = "Real Round";

changeTarget();
startRound();

},5000);

}

startTrial();

/* ---------- change target ---------- */

function changeTarget(){

targetNumber = Math.floor(Math.random()*15) + 5;
targetElement.innerText = targetNumber;

}

/* ---------- round system ---------- */

function startRound(){

if(currentQuestion >= totalQuestions){
finishGame();
return;
}

correctClicked = false;
roundTime = 5;

timerBar.style.width = "100%";

spawnBubbles();

if(timer){
clearInterval(timer);
}

timer = setInterval(()=>{

roundTime--;

timerBar.style.width = (roundTime/5)*100 + "%";

if(roundTime <= 0){

clearInterval(timer);

/* player failed this question */

points = 1;
updateStars();

score = Math.max(0, score - 1);
scoreElement.innerText = score;

currentQuestion++;

changeTarget();
startRound();

}

},1000);

}

/* ---------- correct bubble ---------- */

function correctAnswer(){

correctClicked = true;

clearInterval(timer);

score += points;

if(points < 5){
points++;
}

scoreElement.innerText = score;
updateStars();

currentQuestion++;

setTimeout(()=>{
changeTarget();
startRound();
},300);

}

/* ---------- finish ---------- */

function finishGame(){

clearInterval(timer);

if(score >= 70){

alert("Game 1 Passed! Loading Shortcuts Puzzle...");

setTimeout(()=>{
window.location.href = "games/shortcuts.html";
},1000);

}else{

alert("Minimum score 70 required to pass Game 1");

location.reload();

}

}