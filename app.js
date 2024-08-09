// Selecting DOM Elements
title = document.querySelector(".title");
boxes = document.querySelectorAll(".box");
resetBtn = document.querySelector(".resetBtn");




// Title Animation Settings
let animationTimeout; // Variable to store the timeout ID
const addAnimationShiny = () => {
  clearTimeout(animationTimeout); 
  title.classList.add("animation-shiny");
}
const removeAnimationShiny = () => {
  animationTimeout = setTimeout(() => {
    title.classList.remove("animation-shiny");
  }, 1000);
}

const highlightWinner = (pos1, pos2, pos3) => {
  console.log("winner!");
  clearTimeout(animationTimeout); 
  pos1.classList.add("animation-shiny2");
  pos2.classList.add("animation-shiny2");
  pos3.classList.add("animation-shiny2");
  console.log("found");
}
const disHighlightWinner = () => {
  animationTimeout = setTimeout(() => {
    boxes.forEach(box => {
      box.classList.remove("animation-shiny2");
      })
  })
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
    if (playerO)  {
      box.innerText = "O";
      playerO = false;
    }
    else  {
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

    }
  })
})

// winning patters
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
  for(let pattern of winPatterns)  {
    let pos1 = boxes[pattern[0]];
    let pos2 = boxes[pattern[1]];
    let pos3 = boxes[pattern[2]];
    if (pos1.innerText != "" && pos2.innerText != "" && pos3.innerText != "") {
      if (pos1.innerText === pos2.innerText && pos2.innerText === pos3.innerText) {
        disableBoxes();
        showWinner(pos1.innerText);
        highlightWinner(pos1,pos2,pos3);
        addAnimationShiny();
        return true;
      }

    }
  }
}

// utility functions
const resetGame = () => {
  enableBoxes();
  removeAnimationShiny();
  disHighlightWinner();
  resetBtn.innerText = "Reset";
  title.innerText = `Tic Tac Toe`;
  playerO = true;
  count = 0;
}
const enableBoxes = () => {
  for (let box of boxes)  {
    box.disabled = false;
    box.innerText = "";
  }
}
const disableBoxes = () => {
  for(let box of boxes) {
    box.disabled = true;
  }
}
const showWinner = (pos1) => {
  title.innerText = `Congratulations! Winner is ${pos1}`;
  switchBtn();
}
const switchBtn = () => {
  resetBtn.innerText = "New Game";
} 


resetBtn.addEventListener("click", resetGame);





  // Dark Mode Settings
  let modeBtn = document.querySelector(".modeBtn");
  modeBtn.addEventListener ("click" , () => {
      document.body.classList.toggle("dark-mode");
  })