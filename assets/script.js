var questions = [
    //this will be my questions that will be displayed in the quiz
    {
        prompt: "bla bla bla ",
        options: ["5", "54", "3", "6"],
        answer: "5"
    },
    {
        title: "me me me me  ",
        choices: ["5", "54", "3", "6"],
        answer: "54"
    },
    {
        title: "na na na  ",
        choices: ["5", "54", "3", "6"],
        answer: "3"
    },
    {
        title: "he he he he ",
        choices: ["5", "54", "3", "6"],
        answer: "6"
    },
];

//Dom elements

var questionsEl = document.querySelector("#questions");
var timerEl = document.querySelector("#timer");
var choicesEl = document.querySelector("#choices"); // Review this one
var submitButton = document.querySelector("#submit");
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
    currentQuestion.options.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        choiceBtn.setAttribute("value", choice);
        choiceBtn.textContent = i + 1 + ". " + choice;
        choiceBtn.onclick = questionClick;
        choicesEl.appendChild (choiceBtn);
    })

}

