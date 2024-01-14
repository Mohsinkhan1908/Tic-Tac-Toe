const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let newGameBtn = document.querySelector('#new-btn');

let playerO = true;
let playerX = false;
let count = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8]
];
boxes.forEach((box) => {
  box.addEventListener('click', function (e) {
    if (playerO) {
      box.innerHTML = "O";
      playerO = false;
      playerX = true;
    } else {
      box.innerHTML = "X";
      playerO = true;
      playerX = false;
    }
    box.disabled = true;
    count++;
    let isWinner = checkWinner();
    if(count === 9 && !isWinner){
      gameDraw();
    }
  })
});
const gameDraw = ()=>{
  msg.innerHTML = `Game was Draw !`;
  msgContainer.classList.remove('hide');
  disableBoxes();
} 

const showWinner = (winner) => {
  msg.innerHTML = `Winner is player ${winner}`;
  msgContainer.classList.remove('hide');
  disableBoxes();
}

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerHTML;
    let pos2Val = boxes[pattern[1]].innerHTML;
    let pos3Val = boxes[pattern[2]].innerHTML;

    if ((pos1Val != "") && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        return true;
      }
    }
  }

}
const resetGame = (event) => {
  playerO = true;
  count = 0;
  enableBoxes();
  msgContainer.classList.add("hide");
}
const enableBoxes = () => {
  for (let box of boxes) {
    box.innerHTML = "";
    box.disabled = false;
  }
}
const disableBoxes = () => {
  for (const box of boxes) {
    box.disabled = true;

  }
};

resetBtn.addEventListener('click', resetGame);
newGameBtn.addEventListener('click', resetGame);