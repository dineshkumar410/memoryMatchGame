const gameBoard = document.getElementById("gameBoard");
const restartBtn = document.getElementById("restartBtn");
let cardValues = [
  "A",
  "A",
  "B",
  "B",
  "C",
  "C",
  "D",
  "D",
  "E",
  "E",
  "F",
  "F",
  "G",
  "G",
  "H",
  "H",
];
let flippedCards = [];
let matchedCards = [];

//Initial condition
function init() {
  shuffle(cardValues);
  createGameBoard();
  flippedCards = [];
  matchedCards = [];
}

// Shuffle the cards (Randomizes array order)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Creates inner element that displays card
function createGameBoard() {
  gameBoard.innerHTML = "";
  cardValues.forEach((value) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="content back">?</div>
            <div class="content front">${value}</div>
        `;
    card.addEventListener("click", flipCard);
    gameBoard.appendChild(card);
  });
}

// Flips unflipped cards
function flipCard() {
  if (this.classList.contains("flipped") || flippedCards.length === 2) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

// Checks if flipped 2 cards matching else unflips it
function checkMatch() {
  const [card1, card2] = flippedCards;
  const value1 = card1.querySelector(".front").textContent;
  const value2 = card2.querySelector(".front").textContent;

  if (value1 === value2) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    // Check if the game is over
    if (matchedCards.length === cardValues.length) {
      setTimeout(() => alert("Congratulations, you won! 🥳🎉"), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
    }, 1000);
  }
}

// Restarts the game (Shuffles card)
restartBtn.addEventListener("click", () => {
  init();
});

// Initiates the game
init();
