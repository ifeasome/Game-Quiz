
// Variables regarding the state of the quiz
let quizTime; 
let time = quizQuest.length * 10;
console.log(time);
let currentQuestionIndex = 0; 

// variables that reference HTML page elements
let questionsEL = document.getElementById("quizQuest");
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
    console.log(time);
    timerEL.textContent = time;

    quizTime = setInterval(tickingClock, 1000); // create func tickingClock

    

    getQuestion(); // create func getQuestion
}
// this function is getting questions from QuizQuestions.js file according the user action

function getQuestion() {
    let currentQuestion = quizQuest[currentQuestionIndex];

// puts current questions on the page
    let titleEL = document.getElementById("quizQuest-question");
    titleEL.textContent = currentQuestion.questions; 

// removes all old options 
    optionsEL.innerHTML = "";

currentQuestion.options.forEach(function(option, i) {

    let optionNode = document.createElement("button");
    optionNode.setAttribute("class", "option");
    optionNode.setAttribute("value", option);

    optionNode.textContent = i + 1 + "." + option;

    optionNode.onclick = questionClick; // listens for every option click

    optionsEL.appendChild(optionNode); // shows the option clicked on the page
});
}

function questionClick() {
    if (this.value != quizQuest[currentQuestionIndex].answer) {

        time -= 10;

        if (time < 0) {
            time = 0;
        }

        timerEL.textContent = time;

// plays incorrect sfx 
        sfxIncorrect.play();

        feedbackEL.textContent = "Hmnnn!";
    } else {
// plays correct sfx 
        sfxCorrect.play();

        feedbackEL.textContent = "You won a token!";
    }
// shows right/wrong feedback on page for a few seconds 
        feedbackEL.setAttribute("class", "feedback");
        setTimeout(function(){
            feedbackEL.setAttribute("class", "feedback hide");
        }, 1000);

// moves to the next question
        currentQuestionIndex++; 

// quiz ends when questions are done
        if (currentQuestionIndex === quizQuest.length) {
            endQuiz(); // create this function
        } else {
            getQuestion();
        }
    }


function endQuiz() {
// stops timer 
    clearInterval(quizTime);

// shows end screen
    let endScreenEL = document.getElementById("end-screen");
    endScreenEL.removeAttribute("class");

// shows final score 
    let finalScoreEL = document.getElementById("final-score");
    finalScoreEL.textContent = time;

// hide questions section
    questionsEL.setAttribute("class", "hide");
}

function tickingClock() {
// running time as the quiz starts
    time--;
    timerEL.textContent = time;

// when user runs out of time
    if (time <= 0 ) {
        endQuiz();
    }
}

function saveHighscore() {
// getting initials from user
    let initials = initialsEL.value.trim();
 
    if (initials != "") {
// retrieves already saved scores from local storage and has empty array if none exists
        let highscores = 
        JSON.parse(window.localStorage.getItem("Highscores")) || [];

// this is adding the new score from the user
        let newScore = {
            score: time,
            initials: initials
        };

        highscores.push(newScore); // saving to localstorage
        window.localStorage.setItem("Highscores", JSON.stringify(highscores));

        window.location.href = "SecondPage.html"; // goes to the secondpage html
    }
}

function checkForEnter(event) {
    if(event.key === "Enter") {
        saveHighscore();
    }
}

submitBtn.onclick = saveHighscore; //user submits their name

startBtn.onclick = startQuiz; // listening for user to click "enter"

initialsEL.onkeyup = checkForEnter; // listens for the enter key

