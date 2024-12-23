const quizzes = [
  {
    question: "Which is the only continent in the world without a desert?",
    options: [
      { text: "North America", correct: false },
      { text: "Asia", correct: true },
      { text: "Europe", correct: false },
      { text: "Africa", correct: false }
    ],
  },
  {
    question: "What is the capital of France?",
    options: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false }
    ],
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: [
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Ozone", correct: false },
      { text: "Oganesson", correct: false }
    ],
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      { text: "William Shakespeare", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Charles Dickens", correct: false },
      { text: "Jane Austen", correct: false }
    ]
  },
  {
    question: "What is the largest planet in our solar system?",
    options: [
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Saturn", correct: false },
      { text: "Neptune", correct: false }
    ]
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: [
      { text: "Lion", correct: true },
      { text: "Elephant", correct: false },
      { text: "Tiger", correct: false },
      { text: "Giraffe", correct: false }
    ]
  },
  {
    question: "What is the tallest mountain in the world?",
    options: [
      { text: "Mount Everest", correct: true },
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Makalu", correct: false }
    ]
  },
  {
    question: "Which gas do plants absorb from the atmosphere for photosynthesis?",
    options: [
      { text: "Oxygen", correct: false },
      { text: "Carbon dioxide", correct: true },
      { text: "Nitrogen", correct: false },
      { text: "Hydrogen", correct: false }
    ]
  },
  {
    question: "What is the square root of 64?",
    options: [
      { text: "6", correct: false },
      { text: "8", correct: true },
      { text: "10", correct: false },
      { text: "12", correct: false }
    ]
  },
  {
    question: "Which of these is a programming language?",
    options: [
      { text: "HTML", correct: false },
      { text: "Python", correct: true },
      { text: "CSS", correct: false },
      { text: "XML", correct: false }
    ]
  }
];

const paraElement = document.querySelector('.question_attempt');
const headElement = document.querySelector('.quiz_title');
const nextElement = document.querySelector('.nextBtn');
const prevElement = document.querySelector('.prevBtn');
const resultElement = document.createElement('button');
const btnElement = document.querySelector('.card_button');
const cardElement = document.querySelector('#card');
const orginalResultElement = document.querySelector('#result');
const timerSecondsElement = document.querySelector('.timer_seconds')

let currentQuiz = 0;
let count = 0; 
let correctAnswer = 0;
let wrongAnswer = 0;
let attemptAnswer = 0;
let myScore = 0;
let unattemptScore = 0;


function updateQuiz() {
  if (currentQuiz >= quizzes.length) {
    currentQuiz = quizzes.length - 1;
    alert('This is your last Quiz');
    return;
  }

  if (currentQuiz < 0) {
    currentQuiz = 0;
    alert('This is your first Quiz');
    return;
  }
  
  if (currentQuiz === quizzes.length - 1) {
    resultElement.className = "option";
    resultElement.innerHTML = "Result";
    btnElement.insertBefore(resultElement, btnElement.children[1]);
}

  const selectedQuiz = quizzes[currentQuiz];
  paraElement.innerHTML = `${currentQuiz + 1} of ${quizzes.length} Question`;
  headElement.innerHTML = selectedQuiz.question;

  selectedQuiz.options.forEach((val, index) => {
    const optionElement = document.querySelector(`.option${index + 1}`);
    optionElement.innerHTML = val.text;
    optionElement.style.backgroundColor = "white";
    optionElement.style.color = "#333";
    optionElement.disabled = false;

    optionElement.removeEventListener('click', handleAnswerClick);
    optionElement.addEventListener("click", handleAnswerClick);
  });
}

function handleAnswerClick(event) {
  if (count > 0) return;

  const optionElement = event.target;
  const currentQuizData = quizzes[currentQuiz];
  const selectedOption = currentQuizData.options.find(option => option.text === optionElement.innerHTML);

  if (selectedOption.correct) {
    optionElement.style.backgroundColor = "green";
    optionElement.style.color = "#333";
    correctAnswer++;
  } else {
    optionElement.style.backgroundColor = "red";
    optionElement.style.color = "#333";
    wrongAnswer++;
  }
  
  attemptAnswer++;
  count++;
  myScore = attemptAnswer - wrongAnswer;
}

updateQuiz();

nextElement.addEventListener("click", () => {
  currentQuiz++;
  count = 0;
  updateQuiz();
});

prevElement.addEventListener("click", (event) => {
  currentQuiz--;
  count = 0;
  updateQuiz();
});


resultElement.addEventListener("click", () => {
  cardElement.style.display = "none";
  orginalResultElement.style.display = "block";
  const yourScore = document.querySelector('.your_score');
  yourScore.innerHTML = correctAnswer;
  const totalScoreElement = document.querySelector('.total_score_numeric');
  totalScoreElement.innerHTML = quizzes.length;
  const attemptScoreElement = document.querySelector('.attempt_score_numeric');
  attemptScoreElement.innerHTML = attemptAnswer;
  const unattemptScoreElement = document.querySelector('.unattempt_score_numeric');
  unattemptScoreElement.innerHTML = quizzes.length - attemptAnswer;
  const wrongScoreElement = document.querySelector('.wrong_score_numeric');
  wrongScoreElement.innerHTML = wrongAnswer;
});

const replayElement = document.querySelector('.replayElement')
replayElement.addEventListener("click", () => {
  correctAnswer = 0;
  wrongAnswer = 0;
  attemptAnswer = 0;
  myScore = 0;
  unattemptScore = 0;
  orginalResultElement.style.display = "none";
  cardElement.style.display = "block";
  currentQuiz = 0;
  updateQuiz();
});
