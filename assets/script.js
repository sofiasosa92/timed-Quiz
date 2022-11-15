var questions = [
    //this will be my questions that will be displayed in the quiz
    {
        prompt: "Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        prompt: "me me me me  ",
        choices: ["5", "54", "3", "6"],
        answer: "54"
    },
    {
        prompt: "na na na  ",
        choices: ["5", "54", "3", "6"],
        answer: "3"
    },
    {
        prompt: "he he he he ",
        choices: ["5", "54", "3", "6"],
        answer: "6"
    },
];

//Dom elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices"); // Review this one
var submitButton = document.querySelector("#submit-score");
var startButton = document.querySelector("#start");
var nameEl = document.querySelector("#name");
var feedbackEl = document.querySelector("#feedback");
var playAgainButton = document.querySelector("#playagain");

//Start of quiz

var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

//Begin quiz, new page

function quizStart() {
    timerId = setInterval(clock, 1000);
    timerEl.textContent = time;
    var landingScreenEl = document.getElementById("start-screen");
    landingScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    getQuestion();
}

//Array of questions and answers

function getQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var promptEl = document.getElementById("question-words")
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild (choiceBtn);
    })

}

//In this section we are deducting time for wrong answers

function questionClick() {
    if(this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if(time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        feedbackEl.textContent = 'Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.';
        feedbackEl.styleColor = "red";
    } else {
        feedbackEl.textContent = "Correct!";
        feedbackEl.styleColor = "green";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
        feedbackEl.setAttribute("class", "feedback hide");
    }, 2000);
    currentQuestionIndex++;
    if(currentQuestionIndex === undefined) {
        quizEnd();
    } else {
        getQuestion();
    }
}

//End of the quiz

function quizEnd() {
    clearInterval(timerId);
    var endScreen = document.getElementById("quiz-end");
    endScreen.removeAttribute("class");
    endScreen.innerHTML = "hello"
    var finalScore = document.getElementById("score-final");
    finalScore.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

//When timer reacher to 0

function clock() {
    time--;
    timerEl.textContent = time;
    if(time <= 0) {
        quizEnd();
    }
}

//Log player score and initials

function saveHighscore() {
    var name = nameEl.value.trim();
    if(name !== "") {
        var highscores = 
        JSON.parse(window.localStorage.getItem("highscores")) || [];
        var newScore = {
            score: time,
            name: name
        };
        highscores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highscores));
    }
}

//Save players score

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighscore();
    }
}
nameEl.onKeyup = checkForEnter;

//Save score
// submitButton.onclick = saveHighscore;

submitButton.addEventListener('submit', saveHighscore)

//start quiz


startButton.addEventListener("click", quizStart)