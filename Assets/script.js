// Variables
var timeLeft = 60;
var timerID = 0;
var timerEl = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;

// Event listeners
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
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

// Start quiz
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
function showQuestion(question) {
    questionEl.innerText = question.question;
    question.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsEl.appendChild(button);
    });
}


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
function resetState() {
    nextButton.classList.add("hide");
    checkAnswerEl.classList.add("hide");
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    }
}

function selectAnswer(e) {
    var selectedButton = e.target;
    var correct = selectedButton.dataset.correct;

    checkAnswerEl.classList.remove("hide");

    if (correct) {
        checkAnswerEl.textContent = "Correct!";
    } else {
        checkAnswerEl.textContent = "Sorry, that was incorrect.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsEl.children).forEach(function (button) {
        setStatusClass(button, button.dataset.correct);
    });

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
        checkAnswerEl.classList.remove("hide");
    } else {
        startButton.classList.remove("hide");
        saveScore();
    }
}

// ...previous code...

// Check and show the correct answer by setting the button colors
function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

// Remove classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

// Save scores
function saveScore() {
    clearInterval(timerID);
    timerEl.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        questionContainerEl.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent =
            "Your final score is " + timeLeft;
    }, 2000);
}

// Show high scores
function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide");
    document.getElementById("score-container").classList.add("hide");
    startContainerEl.classList.add("hide");
    questionContainerEl.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials: initials,
            timeLeft: timeLeft,
        };
        scores.push(score);
    }

    var highScoreEl = document.getElementById("highscore");
    highScoreEl.innerHTML = "";

    for (var i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreEl.appendChild(div1);
        highScoreEl.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));
}

// View high scores link
viewHighScores.addEventListener("click", showHighScores);

submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

// Restart or reload
restartButton.addEventListener("click", function () {
    window.location.reload();
});

// Clear localStorage
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});





