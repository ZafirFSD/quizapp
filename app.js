let start_Button = document.querySelector('.start_button');
let username = document.querySelector('#username');
let container = document.querySelector('.container');
let valid = document.querySelector('#valid');
let quiz_container = document.querySelector('.quiz-container');
let student_name = document.querySelector('.student');
let result_container = document.querySelector('.result-section');
let remarks = document.getElementById('performance');
let userNameDisplay = document.getElementById('user-name');
result_container.style.display = 'none';
let seconds = 60;
let minutes = 1;
let timer;

start_Button.addEventListener('click', function() {
    let usernameValue = username.value.trim();
    let trimmedUsername = usernameValue.split(" ").join("");
    if (trimmedUsername.length === 0) {
        valid.innerHTML = "Name is Required";
    } else if (trimmedUsername.length <= 2) {
        valid.innerHTML = "Name must contain 3 or More Letters!";
    } else {
        let capitalizedUsername = usernameValue.charAt(0).toUpperCase() + usernameValue.slice(1).toLowerCase();
        container.style.display = 'none';
        quiz_container.style.display = 'block';
        student_name.innerHTML = `Welcome to the Quiz ${capitalizedUsername}!`;
        userNameDisplay.innerHTML = capitalizedUsername;
        timer = setInterval(time_counter, 1000);
    }
});

function time_counter() {
    seconds--;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById('timer').innerHTML = displayMinutes + " Mins " + displaySeconds + " Sec";
    if (seconds <= 0) {
        seconds = 60;
        minutes--;
    }
    if (minutes < 0) {
        clearInterval(timer);
        seconds = 0;
        minutes = 0;
        document.getElementById('timer').innerHTML = "0 Min 00 Sec";
        quiz_container.style.display = 'none';
        result_container.style.display = 'block';
        calculate();
    }
}

function endQuiz() {
    calculate();
    quiz_container.style.display = 'none';
    result_container.style.display = 'block';
    clearInterval(timer);
}

let All_QUESTIONS = [{
    displayQuestion: "What does 'NaN' stand for in JavaScript?",
    answer: 'Not a Number',
    option_1: ' Null and None',
    option_2: 'New Array Number',
    option_3: 'Not a Number',
    option_4: 'Negative and Null'
},
{
    displayQuestion: "Variable declared with 'let' but not initialized?",
    answer: " 'undefined' ",
    option_1: ' "" (empty string)',
    option_2: " 'null' ",
    option_3: " '0' ",
    option_4: " 'undefined' "
},
{
    displayQuestion: 'Check if a variable is an array in JavaScript?',
    answer: 'Array.isArray(variable)',
    option_1: 'Array.isArray(variable)',
    option_2: 'Variable instanceof Array',
    option_3: 'Variable.constructor === Array',
    option_4: "typeof variable === 'array' "
}, {
    displayQuestion: "Purpose of the 'return' statement in a function?",
    answer: 'It exits the function and optionally returns a value',
    option_1: 'It continues executing the function',
    option_2: 'It exits the function and optionally returns a value',
    option_3: 'It creates a new function',
    option_4: 'It initializes a function variable.'
},
{
    displayQuestion: 'Converting a string to a number in JavaScript?',
    answer: 'All of the above',
    option_1: 'Number(string)',
    option_2: 'parseFloat(string)',
    option_3: 'parseInt(string)',
    option_4: 'All of the above'
}   
];
let all_questions = document.getElementById('Questions');
let current_question = document.getElementById('question-number'); // Display question number here
let option_1 = document.querySelector('.question1');
let option_2 = document.querySelector('.question2');
let option_3 = document.querySelector('.question3');
let option_4 = document.querySelector('.question4');
let Next_btn = document.querySelector('.next-button');
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let answeredQuestionsCount = 0;
let attemptCount = 0;

function displayQuestion() {
    let questionNumber = attemptCount + 1;
    all_questions.innerHTML = 'Q' + questionNumber + ': ' + All_QUESTIONS[attemptCount].displayQuestion;
    option_1.innerHTML = All_QUESTIONS[attemptCount].option_1;
    option_2.innerHTML = All_QUESTIONS[attemptCount].option_2;
    option_3.innerHTML = All_QUESTIONS[attemptCount].option_3;
    option_4.innerHTML = All_QUESTIONS[attemptCount].option_4;
    current_question.innerHTML = ` ${attemptCount + 1} of ${All_QUESTIONS.length}`;  // Display question number
    selected_answer();
}

displayQuestion();

Next_btn.addEventListener('click', function() {
    let user_answer = document.querySelector('div.selected_answer').innerHTML;
    if (user_answer == All_QUESTIONS[attemptCount].answer) {
        correctAnswersCount++;
    } else {
        wrongAnswersCount++;
    }
    answeredQuestionsCount++;

    let selected_ans = document.querySelectorAll('div.alignment');
    selected_ans.forEach(function(element) {
        element.classList.remove('selected_answer');
    });

    if (attemptCount < All_QUESTIONS.length - 1) {
        attemptCount++;
        displayQuestion();  
    } else {
        endQuiz();  
    }

    Next_btn.disabled = true;
    Next_btn.style.opacity = .3;
});

function selected_answer() {
    let selected_ans = document.querySelectorAll('div.alignment');
    Next_btn.disabled = true;
    Next_btn.style.opacity = .3;

    selected_ans.forEach(function(element) {
        element.onclick = function() {
            selected_ans.forEach(function(el) {
                el.classList.remove('selected_answer');
            });
            this.classList.add('selected_answer');
            Next_btn.disabled = false;
            Next_btn.style.opacity = .9;
        };
    });
}

function calculate() {
    let percentage = (correctAnswersCount * 100) / All_QUESTIONS.length;
    let show = Math.floor(percentage);
    document.getElementById('percentage').innerHTML = show + "%";
    if (percentage >= 80) {
        remarks.innerHTML = "🎉 <strong>Congratulations!</strong> You nailed it!";
        remarks.style.color = 'green';
    } else if (percentage >= 70) {
        remarks.innerHTML = "👍 <strong>Well Done!</strong> Great job!";
        remarks.style.color = 'green';
    } else if (percentage >= 50) {
        remarks.innerHTML = "🙂 <strong>Good. Keep it Up!</strong> You can do even better!";
        remarks.style.color = 'orange';
    } else {
        remarks.innerHTML = "😞 <strong>Bad Luck! Try Again</strong> Don't give up!";
        remarks.style.color = 'red';
    }

    document.getElementById('total-questions').innerHTML = All_QUESTIONS.length;
    document.getElementById('attempted-questions').innerHTML = answeredQuestionsCount;
    document.getElementById('correct-answers').innerHTML = correctAnswersCount;
    document.getElementById('wrong-answers').innerHTML = wrongAnswersCount;
}

let try_again = document.querySelector('.try-again');
try_again.addEventListener('click', tryagain);

function tryagain() {
    quiz_container.style.display = 'block';
    result_container.style.display = 'none';
    correctAnswersCount = 0;
    wrongAnswersCount = 0;
    answeredQuestionsCount = 0;
    attemptCount = 0;
    seconds = 60;
    minutes = 1;
    clearInterval(timer);  
    document.getElementById('timer').innerHTML = "01 Min 60 Sec";  
    timer = setInterval(time_counter, 1000);  
    displayQuestion();
};