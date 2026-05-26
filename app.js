let gameSeq = [];
let userSeq = [];

let ranCol=["red", "green", "blue", "yellow"]

let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function(){
    if(start == false){
        start = true;

        levelUp();
    }
});

function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    }, 200);
}

function userflash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    }, 200);
}


function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `level ${level}`;

    let ran = Math.floor(Math.random()*4);

    let color= ranCol[ran];
    let btn = document.querySelector(`.${color}`);

    gameSeq.push(color);

    btnflash(btn);
}

function btnPress() {
    let btn = this;

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userflash(btn);

    check(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnPress)
}

function check(ind){
    if(userSeq[ind] === gameSeq[ind]){
        if(userSeq.length == gameSeq.length){
            setTimeout(levelUp, 1000);
        }
    }else{
            h2.innerHTML=`Game is over! <b>Your score ${level}</b><br>Press any key to start.`;
            document.querySelector("body").style.backgroundColor="red";
            setTimeout(function(){
                document.querySelector("body").style.backgroundColor="";
            },150);
            reset();
        }
}

function reset(){
    gameSeq = [];
    userSeq = [];
    start = false;
    level =0;
}