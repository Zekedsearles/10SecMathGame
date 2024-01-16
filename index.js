$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var interval;
    var highScore = 0

    function updateScore (amount) {
        score += amount;
        $('#score').text(score);
        updateHighScore()
        
    }
    function updateHighScore() {
        if(score > highScore) {
            highScore = score;
        }
        $('#high-score').text(highScore)
    }
    function startGame() {
        if(!interval) {
            if(timeLeft === 0) {
                upDateTime(10)
                updateScore(-score)
                
            }
            interval = setInterval(function () {
                upDateTime(-1);
                if(timeLeft === 0) {
                    clearInterval(interval)
                    interval = undefined;
                }
            }, 1000)
        }
    }
    function randomNumGen(size) {
    return Math.ceil(Math.random() * size);
    }
    function questionGen() {
    var question = {};
    var num1 = randomNumGen(10)
    var num2 = randomNumGen(10)

    question.answer = num1 + num2;
    question.equation = String(num1) + ' + ' + String(num2);

    return question
    }
    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer)
    })
    function checkAnswer(userInput, answer) {
        if(userInput === answer) {
          createNewQuestion()
          $('#user-input').val('')
          upDateTime(+1);
          updateScore(+1)
        }
    }
    function createNewQuestion() {
        currentQuestion = questionGen();
        $('#equation').text(currentQuestion.equation);
    }
    function upDateTime(amount) {
        timeLeft += amount;
        $('#time-left').text(timeLeft);

    }
    createNewQuestion() 
})