// Selecting DOM Elements
const title = document.querySelector(".title");
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".resetBtn");
const switchModeBtn = document.querySelector(".switchModeBtn");

// Mode tracking variable
let isTwoPlayerMode = true;

switchModeBtn.addEventListener("click", () => {
  if (isTwoPlayerMode) {
    title.innerText = "Tic Tac Toe - Computer mode!";
    isTwoPlayerMode = false;
  } else {
    title.innerText = "Tic Tac Toe - 2 players mode!";
    isTwoPlayerMode = true;
  }
  resetGame(); // Reset the game when switching modes
});

// Title Animation Settings
let shiny1Timeout; // Variable to store the timeout ID
const addAnimationShiny = () => {
  clearTimeout(shiny1Timeout);
  title.classList.add("animation-shiny");
}
const removeAnimationShiny = () => {
  shiny1Timeout = setTimeout(() => {
    title.classList.remove("animation-shiny");
  }, 1000);
}

let shiny2Timeout;
const highlightWinner = (pos1, pos2, pos3) => {
  console.log("winner!");
  clearTimeout(shiny2Timeout);
  pos1.classList.add("animation-shiny2");
  pos2.classList.add("animation-shiny2");
  pos3.classList.add("animation-shiny2");
  console.log("found");
}
const disHighlightWinner = () => {
  shiny2Timeout = setTimeout(() => {
    boxes.forEach(box => {
      box.classList.remove("animation-shiny2");
    });
  }, 1000);
}

// Add event listener for mouse entering the box
title.addEventListener("mouseenter", addAnimationShiny);
// Add event listener for mouse leaving the box
title.addEventListener("mouseleave", removeAnimationShiny);

// Tic-tac-Toe Model
let playerO = true;
let count = 0;
boxes.forEach(box => {
  box.addEventListener("click", () => {
    if (box.innerText === "") {
      if (playerO) {
        box.innerText = "O";
        playerO = false;
      } else {
        box.innerText = "X";
        playerO = true;
      }
      box.disabled = true;
      count++;
      let isWinner = checkWinner();
      if (count === 9 && !isWinner) {
        title.innerText = `Game was draw!`;
        disableBoxes();
        addAnimationShiny();
        switchBtn();
      } else if (!playerO && !isWinner && !isTwoPlayerMode) {
        // Computer move
        setTimeout(computerMove, 500); // Add a slight delay for the computer move
      }
    }
  });
});

// Computer move logic
const computerMove = () => {
  let availableBoxes = Array.from(boxes).filter(box => box.innerText === "");
  if (availableBoxes.length > 0) {
    let randomIndex = Math.floor(Math.random() * availableBoxes.length);
    availableBoxes[randomIndex].innerText = "X";
    availableBoxes[randomIndex].disabled = true;
    playerO = true;
    count++;
    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      title.innerText = `Game was draw!`;
      disableBoxes();
      addAnimationShiny();
      switchBtn();
    }
  }
}

// Winning patterns
const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1 = boxes[pattern[0]];
    let pos2 = boxes[pattern[1]];
    let pos3 = boxes[pattern[2]];
    if (pos1.innerText != "" && pos2.innerText != "" && pos3.innerText != "") {
      if (pos1.innerText === pos2.innerText && pos2.innerText === pos3.innerText) {
        disableBoxes();
        switchBtn();
        showWinner(pos1.innerText);
        highlightWinner(pos1, pos2, pos3);
        addAnimationShiny();
        return true;
      }
    }
  }
  return false;
}

// Utility functions
const resetGame = () => {
  enableBoxes();
  removeAnimationShiny();
  disHighlightWinner();
  resetBtn.innerText = "Reset";
  if (!isTwoPlayerMode) {
    title.innerText = "Tic Tac Toe - Computer mode!";
  } else {
    title.innerText = "Tic Tac Toe - 2 players mode!";
  }
  playerO = true;
  count = 0;
}
const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
}
const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
}
const showWinner = (pos1) => {
  title.innerText = `Congratulations! Winner is ${pos1}`;
}
const switchBtn = () => {
  resetBtn.innerText = "New Game";
}

resetBtn.addEventListener("click", resetGame);

// Dark Mode Settings
let themeBtn = document.querySelector(".themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
