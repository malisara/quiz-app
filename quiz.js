'use strict';

const data = [
    {
        question: 'First question?',
        a: 'wrong',
        b: 'wrong',
        c: 'correct',
        d: 'wrong',
        correct: 'c'
    },

    {
        question: 'Second question?',
        a: 'wrong',
        b: 'correct',
        c: 'wrong',
        d: 'wrong',
        correct: 'b'
    },

    {
        question: 'Third question?',
        a: 'wrong',
        b: 'wrong',
        c: 'wrong',
        d: 'correct',
        correct: 'd'
    },

    {
        question: 'Fourth question?',
        a: 'correct',
        b: 'wrong',
        c: 'wrong',
        d: 'wrong',
        correct: 'a'
    }

];

const question = document.getElementById('question');
const mainQuestuonDiv = document.getElementById('quiz-div');
const pointsDiv = document.getElementById('points-div');
const startGameButton = document.getElementById('button');

let currentQuestion = 0;
let points = 0;

startGameButton.addEventListener('click', loadQuiz);


function loadQuiz() {
    document.getElementById('start').style.display = 'none';
    mainQuestuonDiv.style.display = 'flex';

    if (data[currentQuestion] == undefined) {
        showScore();
    }

    else {
        question.innerHTML = data[currentQuestion].question;
        document.getElementById('label_a').innerText = data[currentQuestion].a;
        document.getElementById('label_b').innerText = data[currentQuestion].b;
        document.getElementById('label_c').innerText = data[currentQuestion].c;
        document.getElementById('label_d').innerText = data[currentQuestion].d;

        handleHoverAndClickStyles();
    }
    startGameButton.removeEventListener('click', loadQuiz);
}


function handleHoverAndClickStyles() {
    const arrayAnswers = Array.from(document.querySelectorAll('.answer-div'));

    for (let ans of arrayAnswers) {
        // Remove previously clicked radio button && change color
        ans.style.backgroundColor = '#e6cff5';
        ans.childNodes[1].checked = false;

        ans.addEventListener('click', function () {
            arrayAnswers.forEach(answ => answ.style.backgroundColor = '#e6cff5');
            ans.style.backgroundColor = '#8c78b0';
            ans.childNodes[1].checked = true;
        });

        ans.addEventListener('mouseover', function () {
            ans.style.backgroundColor = '#8c78b0';
        });

        ans.addEventListener('mouseout', function () {
            if (ans.childNodes[1].checked === false) {
                ans.style.backgroundColor = '#e6cff5';
            }
        });
    }
}


document.getElementById('submit-button').addEventListener('click', function () {
    if (currentQuestion < data.length)
        setTimeout(loadQuiz, 500);
    checkAnswer(data[currentQuestion].correct);
    currentQuestion++;
});


function checkAnswer(correctAnswer) {
    const chosenAnswer = document.querySelector('input[name="input"]:checked').id;
    const answerDiv = document.getElementById(chosenAnswer);

    if (correctAnswer === chosenAnswer) {
        answerDiv.parentElement.style.backgroundColor = '#68B984';
        points++;
    }

    else {
        answerDiv.parentElement.style.backgroundColor = '#EB455F';
    }
}


function showScore() {
    mainQuestuonDiv.style.display = 'none';
    pointsDiv.style.display = 'flex';
    document.getElementById('user-score').textContent = points;
}


function startQuiz() {
    points = 0;
    mainQuestuonDiv.style.display = 'none';
    pointsDiv.style.display = 'none';
};

startQuiz();
