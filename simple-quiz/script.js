const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answerBtns = document.querySelector(".answer-btns");
const nextBtn = document.querySelector(".next-btn");

let currentQuestionIndex = 0;
let score = 0;

// start the quiz by resetting the state and showing the first question
const startQuiz = () => {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
};

// reset the state for each question
const resetState = () => {
  // hide next button until an answer is selected
  nextBtn.style.display = "none";
  // remove previous answers
  while (answerBtns.firstChild) {
    answerBtns.removeChild(answerBtns.firstChild);
  }
};

//handle when a user selects an answer
const selectAnswer = (e) => {
  const selectBtn = e.target;
  const isCorrect = selectBtn.dataset.correct === "true";

  if (isCorrect) {
    // highlight correct answer in green
    selectBtn.classList.add("correct");
    score++;
  } else {
    // highlight wrong answer in red
    selectBtn.classList.add("incorrect");
  }

  // loop through all buttons and highlight the correct answer
  Array.from(answerBtns.children).forEach((btn) => {
    if (btn.dataset.correct === "true") {
      btn.classList.add("correct");
    }
    // disable all buttons once one is selected
    btn.disabled = true;
  });
  nextBtn.style.display = "block";
};

// display the current question and its possible answers
const showQuestion = () => {
  resetState();

  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // create a button for each possible answer
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtns.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

// show the user's score at the end of the quiz
const showScore = () => {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
};

const handleNextButton = () => {
  // move to the next question
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    // if no more questions, show the score
    showScore();
  }
};

nextBtn.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    // move to the next question
    handleNextButton();
  } else {
    // restart the quiz when finished
    startQuiz();
  }
});

// start the quiz when the page loads
startQuiz();
