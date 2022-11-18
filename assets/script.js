var questions = [
    //this will be my questions that will be displayed in the quiz
    {
        prompt: "1. Inside which HTML element do we put the JavaScript?",
        choices: ["<javascript>", "<js>", "<script>", "<scripting>"],
        answer: "<script>"
    },
    {
        prompt: "2. How do you call a function named myFunction?",
        choices: ["call myFunction()", "myFunction()", "call function myFunction", "Call.myFunction"],
        answer: "myFunction()"
    },
    {
        prompt: "3. How does a for loop start?",
        choices: ["for (i = 0; i <= 5; i++)", "for (i = 0; i <= 5)", "for i = 1 to 5", " for (i <= 5; i++)"],
        answer: "for (i = 0; i <= 5; i++)"
    },
    {
        prompt: "4. In JavaScript, which of the following is a logical operator?",
        choices: ["|", "&&", "%", "/"],
        answer: "&&"
    },
    {
        prompt: "5. A named element in a JavaScript program that is used to store and retrieve data is a _____.",
        choices: ["method", "assignment operator", "variable", "string"],
        answer: "variable"
    }];




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
    var promptEl = document.getElementById("question-words");
    promptEl.textContent = currentQuestion.prompt;
    choicesEl.innerHTML = "";
    for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices [i];
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = questionClick;
    choicesEl.appendChild(choiceBtn);
}}

//In this section we are deducting time for wrong answers

function questionClick(event) {

    var buttonEl = event.target;

    if (!buttonEl.matches('.choice')) {
        return;
    }

    if(buttonEl.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if(time < 0) {
            time = 0;
        }

        timerEl.textContent = time;
        feedbackEl.textContent = `Wrong! The correct answer was ${questions[currentQuestionIndex].answer}.`;
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
    if(currentQuestionIndex === questions.length) {
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
    var finalScoreEl = document.getElementById("score-final");
    finalScoreEl.textContent = time;
    questionsEl.setAttribute("class", "hide");
}

//When timer reaches to 0

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
    console.log(name)
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

submitButton.onclick = saveHighscore;
console.log(submitButton, "click")

//start quiz


startButton.addEventListener("click", quizStart)