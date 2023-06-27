// Variables
var timeLeft = 60;
var timerID = 0;
var timerEl = document.getElementById("timer");// Timer
var startButton = document.getElementById("start-btn");// Start button
var nextButton = document.getElementById("next-btn");// Next button

var startContainerEl = document.getElementById("start-container");// Start container
var questionContainerEl = document.getElementById("question-container");//
var questionEl = document.getElementById("question");// Questions
var answerButtonsEl = document.getElementById("answer-buttons");// Answers
var checkAnswerEl = document.getElementById("check-answer");// Check answer
var viewHighScores = document.getElementById("highscores-link");// High scores
var submitButton = document.getElementById("submit-btn");// Submit button

var clearScoreButton = document.getElementById("clear-btn");// Clear button
var initialsField = document.getElementById("player-name");// Player name
var restartButton = document.getElementById("restart-btn");// Restart button
var scoreField = document.getElementById("player-score");// Player score
var scores = JSON.parse(localStorage.getItem("scores")) || [];// Scores
var shuffledQuestions, currentQuestionIndex;// Questions shuffled

// Event listeners
startButton.addEventListener("click", startGame);// Start button
nextButton.addEventListener("click", () => {// Next button
    currentQuestionIndex++;//
    setNextQuestion();
});

// Countdown timer
function timeTick() {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

// Start up the quiz
function startGame() {
    timerID = setInterval(timeTick, 1000);
    startContainerEl.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove("hide");

    timeTick();
    setNextQuestion();
}


// Next question
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

// Display questions
const showQuestion = (question) => {
    questionEl.innerText = question.question;
  
    const answerButtons = question.answers.map((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsEl.appendChild(button);
      return button;
    });
  
    answerButtonsEl.append(...answerButtons);
};
  


// Questions with answers
var questions = [
    {
        question: "Commonly used data types do not include;",
        answers: [
            { text: "strings", correct: false },
            { text: "booleans", correct: false },
            { text: "alerts", correct: true },
            { text: "numbers", correct: false },
        ],
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Hyperlinks and Text Markup Language", correct: false },
            { text: "None of the above", correct: false },
        ],
    },
    {
        question: "What does CSS stand for?",
        answers: [
            { text: "creative style sheets", correct: false },
            { text: "computer style sheets", correct: false },
            { text: "cascading style sheets", correct: true },
            { text: "None of the above", correct: false },
        ],

    },
    {
        question: "What does JS stand for?",
        answers: [
            { text: "Java Style", correct: false },
            { text: "Java Script", correct: true },
            { text: "Java Syntax", correct: false },
            { text: "None of the above", correct: false },
        ],

    },
    {
        question: "Which of the following is a programming language?",
        answers: [
            { text: "Adobe", correct: false },
            { text: "HTML", correct: true },
            { text: "Microsoft", correct: false },
            { text: "Google", correct: false },
        ],

    },

];

// Reset function
const resetState = () => {
    nextButton.classList.add("hide");
    checkAnswerEl.classList.add("hide");
    Array.from(answerButtonsEl.children).forEach((button) =>
      button.remove()
    );
};
  


const selectAnswer = (e) => {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
  
    checkAnswerEl.classList.remove("hide");
    checkAnswerEl.textContent = correct ? "Correct!" : "Sorry, that was incorrect.";
  
    if (!correct) {
      timeLeft = (timeLeft <= 10) ? 0 : timeLeft - 10;
    }
  
    Array.from(answerButtonsEl.children).forEach((button) =>
      setStatusClass(button, button.dataset.correct)
    );
  
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove("hide");
      checkAnswerEl.classList.remove("hide");
    } else {
      startButton.classList.remove("hide");
      saveScore();
    }
};
  

// Check and show the correct answer
const setStatusClass = (element, correct) => {
    clearStatusClass(element);
    element.classList.add(correct ? "correct" : "wrong");
};
  

// Clear classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// Save scores
const saveScore = () => {
    clearInterval(timerID);
    timerEl.textContent = `Time: ${timeLeft}`;
    setTimeout(() => {
      questionContainerEl.classList.add("hide");
      document.getElementById("score-container").classList.remove("hide");
      document.getElementById("your-score").textContent = `Your final score is ${timeLeft}`;
    }, 2000);
};
  

// Show high scores
const showHighScores = (initials) => {
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
  
    if (typeof initials === "string") {
      const score = { initials, timeLeft };
      scores.push(score);
    }
  
    const highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";
  
    scores.forEach(({ initials, timeLeft }) => {
      const div1 = document.createElement("div");
      div1.className = "name-div";
      div1.innerText = initials;
  
      const div2 = document.createElement("div");
      div2.className = "score-div";
      div2.innerText = timeLeft;
  
      highScoreEl.append(div1, div2);
    });
  
    localStorage.setItem("scores", JSON.stringify(scores));
  };
  

// View high scores and submit initials
const handleViewHighScores = () => {
    showHighScores();
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
  };
  
  viewHighScores.addEventListener("click", handleViewHighScores);
  submitButton.addEventListener("click", handleSubmit);
  

// Restart or reload
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// Clear localStorage
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});





