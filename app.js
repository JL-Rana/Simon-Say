let gameSeq = [];
let userSeq = [];

let ranCol = ["red", "blue", "green", "yellow"];

let start = false;
let level = 0;
let highScore=0;
let h2 = document.querySelector("h2");

// Keyboard support
document.addEventListener("keypress", function (ev) {
    if (ev.key==='Enter' && start== false) {
        startGame();
    }
});

// Button / mobile support
function startGame() {
    if (start == false) {
        start = true;
        document.getElementById("startBtn").style.display = "none";
        levelUp();
    }
}

function btnflash(btn) {

    setTimeout(function () {
        btn.classList.add("flash");
    }, 200);
    
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 400);
}

function userflash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 200);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level} | Highest Score: ${highScore}`;

    let ran = Math.floor(Math.random() * 4);
    let color = ranCol[ran];
    let btn = document.querySelector(`.${color}`);

    gameSeq.push(color);

    btnflash(btn);
}

function btnClick() {
    if(!start) return;
    let btn = this;
    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);
    userflash(btn);
    check(userSeq.length - 1);
}

// function btnPress(){
    
// }

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnClick);
}

    document.addEventListener('keydown', (ev) =>{
        if(!start) return;

        let b =Number( ev.key);

        if(isNaN(b)) return;
        console.log(b);
        let userColor= ranCol[b-1];

        if(!userColor) return;

        userSeq.push(userColor);
        let btn = document.querySelector(`.${userColor}`)
        userflash(btn);
        check(userSeq.length-1);
    });

function check(ind) {
    if (userSeq[ind] === gameSeq[ind]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        highScore=Math.max(level,highScore);
        h2.innerHTML = `Game Over! <b>Your Score: ${level}</b><br>Press any key or click Start to play again.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "";
        }, 150);
        reset();
    }
}

function reset() {
    gameSeq = [];
    userSeq = [];
    start = false;
    level = 0;
    // highScore=0;
    document.getElementById("startBtn").style.display = "inline-block";
}
