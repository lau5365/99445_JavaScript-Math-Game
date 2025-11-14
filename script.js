let num1, num2, correctAnswer;
let score = 0;
let timeLeft = 15;
let timer;

const questionElement = document.getElementById("question");
const answerInput = document.getElementById("answer");
const feedbackElement = document.getElementById("feedback");
const scoreElement = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

// Sounds
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const timeoutSound = document.getElementById("timeout-sound");

document.getElementById("start-btn").addEventListener("click", startGame);
document.getElementById("submit-btn").addEventListener("click", checkAnswer);

function startGame() {
    score = 0;
    scoreElement.textContent = "Score: " + score;

    generateQuestion();
    startTimer();

    answerInput.disabled = false;
    document.getElementById("submit-btn").disabled = false;
    feedbackElement.textContent = "";
    answerInput.value = "";
    answerInput.focus();
}

function startTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timerDisplay.textContent = "Time: " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            timeoutSound.play();
            feedbackElement.textContent = "⏳ Time's up!";
            feedbackElement.style.color = "red";
            generateQuestion();
            startTimer();
        }
    }, 1000);
}

function generateQuestion() {
    num1 = Math.floor(Math.random() * 10) + 1;
    num2 = Math.floor(Math.random() * 10) + 1;

    const operations = ["+", "-", "*"];
    const operation = operations[Math.floor(Math.random() * operations.length)];

    if (operation === "+") correctAnswer = num1 + num2;
    if (operation === "-") correctAnswer = num1 - num2;
    if (operation === "*") correctAnswer = num1 * num2;

    questionElement.textContent = `${num1} ${operation} ${num2} = ?`;
    answerInput.value = "";
    answerInput.focus();
}

function checkAnswer() {
    const userAnswer = Number(answerInput.value);

    if (userAnswer === correctAnswer) {
        correctSound.play();
        feedbackElement.textContent = "✔ Correct!";
        feedbackElement.style.color = "green";
        score++;
    } else {
        wrongSound.play();
        feedbackElement.textContent = `✘ Wrong! Correct answer was ${correctAnswer}.`;
        feedbackElement.style.color = "red";
    }

    scoreElement.textContent = "Score: " + score;
    generateQuestion();
    startTimer();
}
