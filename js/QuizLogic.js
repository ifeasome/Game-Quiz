// Variables regarding the state of the quiz
let quizTime; 
let time = questions.length * 10;
let currentQuestion = 0; 

// variables that reference HTML page elements
let questionsEL = document.getElementById("questions");
let timerEL = document.getElementById("time");
let optionsEL = document.getElementById("options");
let submitBtn = document.getElementById("submit");
let startBtn = document.getElementById("start-button");
let initialsEL = document.getElementById("name");
let feedbackEL = document.getElementById("feedback");

//sound effects 
let sfxCorrect = new Audio("./QuizTunes/correct.mp3");
let sfxIncorrect = new Audio("./QuizTunes/incorrect.mp3");

function startQuiz() {
    let startscreenEL = document.getElementById("start-screen");
    startscreenEL.setAttribute("class", "hide");

    questionsEL.removeAttribute("class");

    quizTime = setInterval(quizClock, 1000); // create func quizClock

    timerEL.textContent = time;

    getQuestion(); // create func getQuestion
}

function getQuestion() {

}