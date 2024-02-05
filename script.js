const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
// defining cards to keep track of game
let firstCard = null;
let secondCard = null;
let cardsFlipped = 0;
let isGameActive = false;
let score = 0;

//access to elemetns for updating game
const scoreDisplay = document.getElementById("score");
const startButton = document.getElementById("start-game");
const restartButton = document.getElementById("restart-game");

//function to handle card click events
function handleCardClick(event) {
  if (!isGameActive || event.target.classList.contains("flipped")) {
    return;
  }

  if (!firstCard || !secondCard) {
    event.target.style.backgroundColor = event.target.classList[0];
    event.target.classList.add("flipped");
  
    //assign the clicked card to firstCard or secondCard
    if (!firstCard) {
      firstCard = event.target;
    } else if (event.target !== firstCard) {
      secondCard = event.target;
      checkForMatch();
    }
  }
}

//function to check if two cards match
function checkForMatch() {
  if (firstCard.className === secondCard.className) {
    cardsFlipped += 2;
    firstCard.removeEventListener("click", handleCardClick);
    secondCard.removeEventListener("click", handleCardClick);
    incrementScore(); // Increment score only when a match is found
    resetTurn();
    //check if all cards match
    if (cardsFlipped === COLORS.length) {
      endGame();
    }
  } else {
    setTimeout(() => {
      // Flip the cards back over
      firstCard.style.backgroundColor = "";
      secondCard.style.backgroundColor = "";
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
      resetTurn();
    }, 1000);
  }
}

//reset cards for the next turn
function resetTurn() {
  firstCard = null;
  secondCard = null;
}

//increment score
function incrementScore() {
  score++;
  scoreDisplay.textContent = score;
}

//starts game
function startGame() {
  isGameActive = true;
  score = 0;
  cardsFlipped = 0;
  scoreDisplay.textContent = score;
  startButton.disabled = true;
  restartButton.disabled = false;
  
  // Clear the game board before creating new cards
  gameContainer.innerHTML = '';

  // Shuffle and create new cards
  let shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
}

//restarts the game
function restartGame() {
  isGameActive = false;
  gameContainer.innerHTML = ''; // Clear the game board
  startGame(); // Restart the game
}
//ends the game
function endGame() {
  isGameActive = false;
  startButton.disabled = false;
  restartButton.disabled = true;
  alert(`Game over! Your score is ${score}`);
}
//event listeners for buttons
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);

// makes all cards flip twice when clicked
function flipAllCards() {
  const cards = document.querySelectorAll(".flipped");
  cards.forEach(card => {
    card.style.backgroundColor = "";
    card.classList.remove("flipped");
  });
} 




// when the DOM loads
createDivsForColors(shuffledColors);
