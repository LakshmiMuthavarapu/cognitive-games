function spawnBubbles(){

gameArea.innerHTML="";

let bubbles=[];

let a=Math.floor(Math.random()*targetNumber);
let b=targetNumber-a;

bubbles.push({a:a,b:b,correct:true});

while(bubbles.length<5){

let x=Math.floor(Math.random()*10);
let y=Math.floor(Math.random()*10);

if(x+y!==targetNumber){

bubbles.push({a:x,b:y,correct:false});

}

}

bubbles.sort(()=>Math.random()-0.5);

let positions=[];

bubbles.forEach(b=>{

let bubble=document.createElement("div");

bubble.className="bubble";
bubble.innerText=b.a+"+"+b.b;

bubble.onclick=function(){

if(b.correct){

bubble.classList.add("pop");
correctAnswer();

}else{

let cross=document.createElement("div");
cross.className="wrongMark";
cross.innerText="❌";

bubble.appendChild(cross);

points=1;
updateStars();

}

};

/* avoid overlap */

let placed=false;

while(!placed){

let x=Math.random()*(gameArea.clientWidth-80);
let y=Math.random()*(gameArea.clientHeight-80);

let overlap=positions.some(p=>{
return Math.hypot(p.x-x,p.y-y)<85;
});

if(!overlap){

bubble.style.left=x+"px";
bubble.style.top=y+"px";

positions.push({x,y});
placed=true;

}

}

gameArea.appendChild(bubble);

});

/* floating movement */

setInterval(()=>{

document.querySelectorAll(".bubble").forEach(b=>{

let x=parseFloat(b.style.left);
let y=parseFloat(b.style.top);

x+=Math.random()*6-3;
y+=Math.random()*6-3;

x=Math.max(0,Math.min(x,gameArea.clientWidth-70));
y=Math.max(0,Math.min(y,gameArea.clientHeight-70));

b.style.left=x+"px";
b.style.top=y+"px";

});

},200);
function finishGame(){

if(score >= 70){

alert("Game 1 Passed!")

setTimeout(()=>{
window.location.href="games/shortcuts.html"
},1000)

}else{

alert("Minimum score 70 required")

location.reload()

}

}

}