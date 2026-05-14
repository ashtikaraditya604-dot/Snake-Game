let gameContainer=document.querySelector('.game-container');
let scoreConainer=document.querySelector('.score-container');

let foodX,foodY;
let headX=13,headY=13;

let velocityX=0,velocityY=0;

let snakeBody=[];

let score=0;

function generateFood(){
     foodX=Math.floor(Math.random()*26);
     foodY=Math.floor(Math.random()*26);
      for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[i][0]===foodY && snakeBody[i][1]===foodX){
            generateFood();
        }} 
}

function gameOver(){
    headX=12;
    headY=12;
    generateFood();
    velocityX=0;
    velocityY=0;
    snakeBody=[];
    score=0;
    scoreConainer.innerHTML="Score: "+score;

    clearInterval(snakespeed);
   snakespeed = setInterval(renderGame, 150);

    alert("game Over")
}

function renderGame(){
    let updatedGame=` <div class="food" style="grid-area:${foodY}/${foodX};"></div>`;

    if(foodX==headX && foodY==headY){
         snakeBody.push([foodX,foodY]);
         generateFood();
         score=score+10;
         scoreConainer.innerHTML=`Score: ${score}`;

         if (score == 50) {
           clearInterval(snakespeed);
           snakespeed = setInterval(renderGame, 50);
         }
    }


    headX+=velocityX;
    headY+=velocityY;
    snakeBody.pop();
    snakeBody.unshift([headX,headY]); 

    if(headX==0 || headY==0 || headX==26 || headY==26){
        gameOver();
    }

    for(let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0] == snakeBody[i][0] && snakeBody[0][1] == snakeBody[i][1]){
            gameOver();
        }
    }
    for(let i=0;i<snakeBody.length;i++){
        updatedGame=updatedGame+` <div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    gameContainer.innerHTML=updatedGame;
}
generateFood();
let snakespeed=setInterval(renderGame,150);


document.addEventListener('keydown',function(e){
    console.log(e.key);
    let key=e.key;

    if(key==="ArrowUp" && velocityY!==1){
        velocityX=0;
        velocityY=-1;
    }
    else if(key==="ArrowDown" && velocityY!==-1){
        velocityX=0;
        velocityY=1;
    }
    else if(key==="ArrowLeft" && velocityX!==1){
        velocityX=-1;
        velocityY=0;
    }
    else if(key==="ArrowRight" && velocityX!==-1){
        velocityX=1;
        velocityY=0;
    }
})