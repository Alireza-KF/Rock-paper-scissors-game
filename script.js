// Get references to HTML elements
const no = document.getElementById("no");
const yes = document.getElementById("Yes");
const question = document.getElementById("question");
const start = document.getElementById("start");
const again = document.getElementById("again");
const back = document.getElementById("back");
const BackQuestion = document.getElementById("back-question");
const player = document.getElementById("player");
const selector = document.getElementById("selector");
const want = document.getElementById("wantplay");
const items = document.getElementById("items");
const imageElement = document.getElementById("image-element"); // Player's image element
const systemImageElement = document.getElementById("system-image-element"); // System's image element
const playerScoreElement = document.getElementById("Player-score");
const systemScoreElement = document.getElementById("System-score");
const resultTextElement = document.querySelector(".result-text"); // Result text element
const resultElement = document.querySelector(".result"); // Result display element

// Initialize game variables
let playerScore = 0;
let systemScore = 0;
let round = 0;
const maxRounds = 10;

// Function to reset the game state
function resetGame() {
  question.classList.remove("d-none");
  want.classList.remove("d-none");
  question.style.display = "block";
  want.style.display = "block";
  items.classList.remove("d-block");
  items.classList.add("d-none");
  selector.classList.add("d-none");
  imageElement.classList.add("d-none");
  systemImageElement.classList.add("d-none");
  start.classList.remove("disabled");
  again.classList.add("d-none");
  round = 0;
  resultElement.classList.add("d-none");
  playerScore = 0;
  systemScore = 0;
  updateScores();
}

// Function to update the scores on the UI
function updateScores() {
  playerScoreElement.textContent = playerScore;
  systemScoreElement.textContent = systemScore;
}

// Function to determine the winner of a round
function determineWinner(playerChoice, systemChoice) {
  if (!playerChoice || !systemChoice) return null; // بررسی مقدارهای ورودی
  playerChoice = playerChoice.toLowerCase();
  systemChoice = systemChoice.toLowerCase();

  if (playerChoice === systemChoice) return "draw"; // بررسی مساوی شدن

  // تعریف قوانین برنده شدن
  const winningCases = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper",
  };

  return winningCases[playerChoice] === systemChoice ? "player" : "system";
}


// Event listener for the "No" button
no.addEventListener("click", () => {
  question.style.display = "none";
  start.classList.add("disabled");
  back.classList.add("d-flex");
  back.classList.remove("d-none");
});

// Event listener for the "Yes" button
yes.addEventListener("click", () => {
  want.style.display = "none";
  items.classList.add("d-block");
  items.classList.remove("d-none");
  selector.classList.remove("d-none");
  again.classList.remove("d-none"); // Show the "Again" button
  start.classList.add("d-none"); // Hide the "Start" button
});

// Event listener for the "Back" button
back.addEventListener("click", () => {
  BackQuestion.style.transform = "translate(0)";
  back.classList.add("d-none");
  back.classList.remove("d-flex");
});

// Event listener for the "Enter" key
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (player.value.toLowerCase() === "yes") {
      question.style.display = "block";
      start.classList.remove("disabled");
      BackQuestion.style.transform = "translate(-100%)";
    }
    if (player.value.toLowerCase() === "no") {
      question.style.display = "none";
      back.classList.add("d-flex");
      back.classList.remove("d-none");
      BackQuestion.style.transform = "translate(-100%)";
    }
  }
});

// Event listener for the options (images) click
document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', (event) => {
    const selectedValue = event.target.alt;
    let imageUrl = event.target.src;

    imageElement.src = imageUrl;
    imageElement.classList.add("d-block");
    imageElement.classList.remove("d-none");
    question.classList.add("d-none");

    // Change system image randomly
    const images = ["./image/Rock.png", "./image/Paper.png", "./image/scissors.png"];
    const randomImage = images[Math.floor(Math.random() * images.length)];
    systemImageElement.src = randomImage;
    systemImageElement.classList.remove("d-none");

    // Determine the winner
    const systemChoice = randomImage.split("/").pop().split(".")[0];
    const winner = determineWinner(selectedValue, systemChoice);

    if (winner === "player") {
      playerScore++;
      resultTextElement.textContent = "You win";
    } else if (winner === "system") {
      systemScore++;
      resultTextElement.textContent = "Bot win";
    } else {
      resultTextElement.textContent = "Draw";
    }

    round++;
    updateScores();

    // Display the result
    resultElement.classList.remove("d-none");
    resultElement.classList.add("d-flex");

    // Check if the game is over
    if (round >= maxRounds) {
      if (playerScore > systemScore) {
        alert(`Winner! Final score - You: ${playerScore}, Bot: ${systemScore}`);
      } else if (systemScore > playerScore) {
        alert(`Winner! Final score - Bot: ${systemScore}, You: ${playerScore}`);
      } else {
        alert(`It's a draw! Final score - You: ${playerScore}, Bot: ${systemScore}`);
      }
      resetGame();
    } else {
      again.classList.remove("d-none"); // Show the "Again" button after each round
    }
  });
});

// Event listener for the "Start" button
start.addEventListener("click", () => {
  question.classList.remove("d-none"); // Show the question element
  start.classList.add("d-none");
  again.classList.remove("d-none");
});

// Event listener for the "Again" button
again.addEventListener("click", () => {
  items.classList.add("d-block");
  items.classList.remove("d-none");
  selector.classList.remove("d-none");
  want.classList.add("d-none");
  resultElement.classList.add("d-none");
  imageElement.classList.add("d-none");
  systemImageElement.classList.add("d-none");
  question.classList.remove("d-none"); // Show the question element again
  console.log(again)
});