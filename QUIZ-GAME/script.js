const questions = [
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars"
  },
  {
    question: "Which gas do plants absorb?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: "Carbon Dioxide"
  },
  {
    question: "What is H2O commonly known as?",
    options: ["Salt", "Water", "Oxygen", "Hydrogen"],
    answer: "Water"
  },
  {
    question: "Which is the smallest prime number?",
    options: ["1", "2", "3", "5"],
    answer: "2"
  },
  {
    question: "What is the national animal of India?",
    options: ["Lion", "Elephant", "Tiger", "Peacock"],
    answer: "Tiger"
  }
];

let currentQ = 0;
let score = 0;
const totalQ = questions.length;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const currentQEl = document.getElementById("currentQ");
const totalQEl = document.getElementById("totalQ");
const nextBtn = document.getElementById("nextButton");
const resultScreen = document.getElementById("resultScreen");
const quizScreen = document.getElementById("quizScreen");
const finalScoreEl = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartButton");

totalQEl.textContent = totalQ;

function loadQuestion() {
  const current = questions[currentQ];
  questionEl.textContent = current.question;
  currentQEl.textContent = currentQ + 1;
  optionsEl.innerHTML = "";

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(li, current.answer);
    optionsEl.appendChild(li);
  });

  nextBtn.disabled = true;
}

function selectOption(selectedLi, correctAnswer) {
  const allOptions = optionsEl.querySelectorAll("li");
  allOptions.forEach(li => li.style.pointerEvents = "none");

  if (selectedLi.textContent === correctAnswer) {
    selectedLi.style.backgroundColor = "#28a745"; // Green
    score++;
    scoreEl.textContent = score;
  } else {
    selectedLi.style.backgroundColor = "#dc3545"; // Red
    allOptions.forEach(li => {
      if (li.textContent === correctAnswer) {
        li.style.backgroundColor = "#28a745";
      }
    });
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQ++;
  if (currentQ >= totalQ) {
    showResult();
  } else {
    loadQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  currentQ = 0;
  score = 0;
  scoreEl.textContent = score;
  quizScreen.classList.add("active");
  resultScreen.classList.add("hide");
  loadQuestion();
});

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.remove("hide");
  finalScoreEl.textContent = '${score} / ${totalQ}';
}

loadQuestion();