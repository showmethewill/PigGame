"use strict";

// Selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

const saveBestScore = (score) => {
  const key = `bestScoreP${activePlayer}`;
  const bestScore = Number(localStorage.getItem(key)) || 0;
  if (score > bestScore) {
    localStorage.setItem(key, score);
  }
};

const loadScores = () => {
  const prevScoreP0 = Number(localStorage.getItem("prevScoreP0")) || 0;
  const prevScoreP1 = Number(localStorage.getItem("prevScoreP1")) || 0;
  return { prevScoreP0, prevScoreP1 };
};

// Starting conditions
const init = function () {
  const { prevScoreP0, prevScoreP1 } = loadScores();

  document.querySelector(
    ".high-score-p0"
  ).textContent = `Previous Score: ${prevScoreP0}`;
  document.querySelector(
    ".high-score-p1"
  ).textContent = `Previous Score: ${prevScoreP1}`;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = currentScore;
  current1El.textContent = currentScore;

  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");

  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `images/dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //Check score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      saveBestScore(scores[activePlayer]);
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", function () {
  localStorage.setItem("prevScoreP0", scores[0]);
  localStorage.setItem("prevScoreP1", scores[1]);

  init();
});
