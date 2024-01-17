$(document).ready(function () {
    var currentQuestion;
    var timeLeft = 10;
    var score = 0;
    var interval;
    var highScore = 0;
    var gameTypeSelected = false;

    function updateScore (amount) {
        score += amount;
        $('#score').text(score);
        updateHighScore();
    }
    
    function updateHighScore() {
        if(score > highScore) {
            highScore = score;
        }
        $('#high-score').text(highScore);
    }
    
    function startGame() {
        if(gameTypeSelected && !interval && timeLeft === 0) {
            upDateTime(10);
            updateScore(-score);
        }
        
        if(gameTypeSelected && !interval) {
            interval = setInterval(function () {
                upDateTime(-1);
                if(timeLeft === 0) {
                    clearInterval(interval);
                    interval = undefined;
                }
            }, 1000);
        }
    }
    

    function randomNumGen(size) {
        return Math.ceil(Math.random() * size);
    }
    
    function questionGen() {
        var question = {};
        var num1 = randomNumGen(10);
        var num2 = randomNumGen(10);

        if($('#plus').is(':checked')) {
            question.answer = num1 + num2;
            question.equation = String(num1) + ' + ' + String(num2);
        } else if($('#minus').is(':checked')) {
            question.answer = num1 - num2;
            question.equation = String(num1) + ' - ' + String(num2);
        } else if($('#times').is(':checked')) {
            question.answer = num1 * num2;
            question.equation = String(num1) + ' x ' + String(num2);
        } else if($('#division').is(':checked')) {
            question.answer = num1 / num2;
            question.equation = String(num1) + ' ÷ ' + String(num2);
        }

        return question;
    }
    $('#check-boxes').on('change', function () {
        gameTypeSelected = true;
        createNewQuestion();
        $('#user-input').val('')
        resetTimer()
    })
    function resetTimer() {
        timeLeft = 10;
        $('#time-left').text(timeLeft);
        clearInterval(interval);
        interval = undefined;
    }
    $('#user-input').on('keyup', function () {
        startGame();
        checkAnswer(Number($(this).val()), currentQuestion.answer);
    });
    
    function checkAnswer(userInput, answer) {
        if(userInput === answer) {
            createNewQuestion();
            $('#user-input').val('');
            upDateTime(1);
            updateScore(1);
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
    
    createNewQuestion();
});