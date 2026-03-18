const SIZE = 5;

let grid;
let player;

let score = 0;
let points = 1;
let trial = true;

let totalQuestions = 35;
let currentQuestion = 0;

let roundTime = 5;
let timer = null;

const gameArea = document.getElementById("gameArea");
const scoreEl = document.getElementById("score");
const starsEl = document.getElementById("stars");
const roundLabel = document.getElementById("roundLabel");
const timerBar = document.getElementById("timerProgress");

/* ---------- stars ---------- */

function updateStars(){
if(starsEl){
starsEl.innerText = "⭐".repeat(points);
}
}

updateStars();

/* ---------- start game ---------- */

function startGame(){

document.getElementById("trialScreen").style.display="none";
document.getElementById("gameScreen").style.display="block";

generateMaze();
render();

setTimeout(()=>{

trial=false;
roundLabel.innerText="Real Round";

startRound();

},5000);

}

/* ---------- round ---------- */

function startRound(){

if(currentQuestion >= totalQuestions){
finishGame();
return;
}

roundTime = 5;
timerBar.style.width="100%";

generateMaze();
render();

if(timer) clearInterval(timer);

timer=setInterval(()=>{

roundTime--;

timerBar.style.width=(roundTime/5)*100 + "%";

if(roundTime<=0){

clearInterval(timer);

/* reset streak */

points = 1;
updateStars();

currentQuestion++;

startRound();

}

},1000);

}

/* ---------- maze generation ---------- */

function generateMaze(){

while(true){

grid=[];

for(let r=0;r<SIZE;r++){
grid[r]=[];
for(let c=0;c<SIZE;c++){
grid[r][c]=" ";
}
}

let walls = 7 + Math.floor(Math.random()*3);

for(let i=0;i<walls;i++){

let r=Math.floor(Math.random()*SIZE);
let c=Math.floor(Math.random()*SIZE);

if((r===0&&c===0)||grid[r][c]=="#"){
i--;
continue;
}

grid[r][c]="#";

}

let gr,gc;

do{
gr=Math.floor(Math.random()*SIZE);
gc=Math.floor(Math.random()*SIZE);
}
while(grid[gr][gc]=="#"||(gr===0&&gc===0));

grid[gr][gc]="⭐";

let pathLength = pathExists(0,0,gr,gc);

if(pathLength>6){
player={r:0,c:0};
break;
}

}

}

/* ---------- path check ---------- */

function pathExists(sr,sc,gr,gc){

let visited=Array(SIZE).fill().map(()=>Array(SIZE).fill(false));
let queue=[[sr,sc,0]];

visited[sr][sc]=true;

while(queue.length){

let [r,c,d]=queue.shift();

if(r===gr && c===gc) return d;

let dirs=[[1,0],[-1,0],[0,1],[0,-1]];

for(let dir of dirs){

let nr=r+dir[0];
let nc=c+dir[1];

if(nr>=0 && nc>=0 && nr<SIZE && nc<SIZE &&
!visited[nr][nc] && grid[nr][nc]!="#"){

visited[nr][nc]=true;
queue.push([nr,nc,d+1]);

}

}

}

return 0;

}

/* ---------- render ---------- */

function render(){

gameArea.innerHTML="";

let board=document.createElement("div");
board.className="shortcutGrid";

for(let r=0;r<SIZE;r++){

for(let c=0;c<SIZE;c++){

let cell=document.createElement("div");
cell.className="cell";

if(grid[r][c]=="#"){
cell.classList.add("wall");
cell.innerText="⬛";
}

if(grid[r][c]=="⭐"){
cell.classList.add("goal");
cell.innerText="⭐";
}

if(player.r===r && player.c===c){
cell.classList.add("player");
cell.innerText="🔵";
}

board.appendChild(cell);

}

}

gameArea.appendChild(board);

}

/* ---------- player movement ---------- */

document.addEventListener("keydown",function(e){

if(e.key==="ArrowUp"||e.key==="ArrowDown"||
e.key==="ArrowLeft"||e.key==="ArrowRight"){
e.preventDefault();
}

let nr=player.r;
let nc=player.c;

if(e.key==="ArrowUp") nr--;
if(e.key==="ArrowDown") nr++;
if(e.key==="ArrowLeft") nc--;
if(e.key==="ArrowRight") nc++;

if(nr<0||nc<0||nr>=SIZE||nc>=SIZE) return;
if(grid[nr][nc]=="#") return;

player.r=nr;
player.c=nc;

if(grid[nr][nc]=="⭐"){

if(!trial){

score += points;

if(points<5) points++;

scoreEl.innerText=score;
updateStars();

}

currentQuestion++;

startRound();

}

render();

});

/* ---------- finish ---------- */

function finishGame(){

if(score >= 75){

alert("Game 2 Passed! Loading Mental Rotation...");

setTimeout(()=>{

window.location.href = "rotation.html";

},1000);

}else{

alert("Minimum score 75 required to pass");

location.reload();

}

}