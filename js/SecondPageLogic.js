function printdisplayScore() {
  let highscores = JSON.parse(window.localStorage.getItem("Highscores")) || [];

  highscores.sort(function (a, b) {
    return b.score - a.score;
  });

  highscores.forEach(function (score) {
    let liTAG = document.createElement("li");
    liTAG.textContent = score.initials + " - " + score.score;

    let olEL = document.getElementById("Highscores");
    olEL.appendChild(liTAG);
  });
}

function clearHighscores() {
  window.localStorage.removeItem("Highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;

printdisplayScore();

// create a for each function for each  score
// that appends to the displayscore
// create a list el and append the score to the element.
// clear function when the button is clicked and the local storage
// reload after clear
