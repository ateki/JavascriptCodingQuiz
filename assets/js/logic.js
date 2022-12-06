// TODO: Should quiz always display questions in order or randomize?
// TODO: Determine naming strategy for and element selectors so as to make clear in codebase: either timeEl  elTime  elStartScreen/startScreenEl
// elStartBtn/ startBtnEl
// TODO: Hide(element) check to ensure not already added.  Or does 
    // TODO Add check to ensure hide is not already added.
    //- wouldnt want duplicate hides.
// TODO: Rename startGame displayStartGame or startGameDisplay
// TODO: Rename endGame either displayEndGame or endGameDisplay
// TODO: Rename newGame() either displayNewGame or newGameDisplay
// TODO Rename getPlayersInitials()  getInputPlayersInitials  getPlayersInititalsInput
// TODO: Rename setTime()   as startCountDown()?  startQuizCountDown  countDown   timerCountDown  quizCountdown  startCountDown  
// TODO: setInterval should use named function rather than annon function

 // TODO: displayQuestion - verify question data as expected: no empty text, verify ansewrIdx is acceptable with reference to optionsArr
 //      ensure optionsArr is not null or empty and has more than one possible answer
// TODO: displayANswerOptions data-correct set to boolean rather than string
// TODO: Rename displayAnswerOptions as  displayAnswerChoices? 
// TODO Event listeners anon functions replaced with named functions


/** -------------------------------------------------------------
 * 
 * Filename: logic.js
 * Desc: Logic for quiz, displaying of quix elements along with event handlers
 * Author: Irene Atek
 * 
 * --------------------------------------------------------------
 */
  

/**
 * Module imports
 */
/* import {recordHighScore} from './scores.js';  */ /*- MODULE modification -*/



/**
 * Global constants
 */


 /**
  * Feedback functionality constants
  */

 /* Sound Files to show during feedback on question answers */
 const AUDIO_FILE_CORRECT = new Audio('./assets/sfx/correct.wav');
 const AUDIO_FILE_WRONG = new Audio('./assets/sfx/incorrect.wav');

 /* Duration feedback will be displayed on each question cycle */
 const FEEDBACK_DISPLAY_DURATION = 1000;  // 1 secs in millisecs
 
/* Feedback messages */
const MSG_FEEDBACK_WRONG = 'Wrong!';
const MSG_FEEDBACK_CORRECT = 'Correct!';

/* Error messages */
const INITIALS_INPUT_ALPHA_ERROR = "Input Error: Initials should be alpha characters only.   Please try again."

const STARTING_TIME_IN_SECS = 60;       // 10 secs per question
const TIME_DEDUCTED_WRONG_ANSWER = 10;  // Number of seconds deducted on wrong answer.


/* Countdown timer refresh */
const ONE_SEC_IN_MILLISECS = 1000;      

/* Paths to other pages */
const PATH_TO_HIGHSCORES_PAGE = './highscores.html';




/**
 * Global game variables - required access throughout quiz
 */

var secondsLeft;            /* time remaining in current game */
var currentQuestionIdx=0;   /* Used to track idx of question currently on/displaying */

var questionsComplete = false;


/**
 * Element selectors
 */

 var time = document.getElementById('time');
 
 /* Elements for start of game */
 var startScreen = document.getElementById('start-screen'); 
 var startBtn = document.getElementById('start');
 var feedback = document.getElementById('feedback');

 /* Elements for running quiz/questions */
 var questionsScreen = document.getElementById('questions');
 var questionTitle = document.getElementById('question-title'); 
 var choices = document.getElementById('choices');

 /* Elements for end of game */
 var endScreen = document.getElementById('end-screen');     
 var finalScore = document.getElementById('final-score');
 var initials = document.getElementById('initials');
 var submitBtn = document.getElementById('submit');


 


 /**
  *     Utility functions 
  * 
  */


 /**
  * Sets up the element not to be shown:
  * - currently by adding 'hide' to the element's classlist.
  * See .css to ensure 'hide' style sets the element to not be shown.
  * Note function will not impact any other classes that are currently on the element
  * and so multi classes should be allowed along with the 'hide'.  
  * No dupes are possible as  classlist represents set of tokens it will only hold unique items.
  * @param {*} element 
  */
 function hide(element) {
    // ensure keep any other classes intact
    element.classList.add("hide");
 }

  /**
  * Ensures  class of element no longer includes 'hide'.
  * See .css to ensure 'hide' style displays the given element.
  * Note function will only remove 'hide' class and have no impact on any other classes 
  * that are currently on the element before function call.
  * @param {*} element 
  */
 function show(element) {
    // ensure keep any other classes intact
    element.classList.remove("hide");
 }


/**
 * Updates page to hide section of page identified as the start screen and feedback.
 * Displays the section of the page identified as the questions screen.
 */
function startGame() {
    hide(startScreen);
    show(questionsScreen);
    hide(feedback);
}

/**
 * Updates page to hide section of page  identified as the questions screen and feedback.
 * Displays the section of the page identified as the end screen.
 * Additionally the global variable holding score will be displayed on the element identified
 * as final score.
 */
function endGame() {
    hide(questionsScreen);
    show(feedback);         // required for final question answer
    show(endScreen);
    finalScore.innerText = getFinalScore();            
}


/**
 * Updates page to hide sections of page identified as the questions screen and 
 * the end screen as well as any feedback that may have been given
 * Displays only the section of page identified as the start screen.
 */
function newGame() {
    hide(questionsScreen);
    hide(endScreen);
    hide(feedback);
    show(startScreen);
}

/**
 * 
 * @returns secondsLeft
 */
function getFinalScore() {
    return secondsLeft;
}

/**
 * Use regular expression to check string is only alpha chars
 * @param {*} str 
 * @returns True if only chars in string else returns false.
 */
function isAlphaOnly(str) {
    return /^[a-zA-Z]+$/.test(str);
}


/**
 * Gets input from initials element, validates to ensure only alpha chars and returns.
 * If numerics or empty value entered, will return Error to be caught by calling code.
 * @returns input in upper case 
 * @error if alpha chars are not found.  
 */
function getPlayersInitials() {

    var input = initials.value.trim();      // remove any  leading/trailing blank chars

    if (input.length>0 && isAlphaOnly(input)) {
        // Only accept non empty, alpha strings
        return  input.toUpperCase();
    } else {
        throw new Error(INITIALS_INPUT_ALPHA_ERROR);
    }
}




/**
 * Initially sets timer at time set by global const 'STARTING_TIME_IN_SECS'
 * and displays on element on page identified as time.
 * Then every second timer is decremented by 1 sec and updated on page.
 * Once reaches 0 secs (or if questions have been all completed), interval execution is stopped and steps are taken 
 * to end game.
 */
function setTime() {

  secondsLeft = STARTING_TIME_IN_SECS;
  time.textContent = secondsLeft;

  // Sets interval in variable
  var timerInterval = setInterval(function() {

    // Time should never become negative value.
    if (secondsLeft >0) {
        secondsLeft--;
    }
    time.textContent = secondsLeft;

    // TODO Add check if quiz finished and if so end game set score=timeLeft
    // if(secondsLeft === 0) {
    //IA 6/12  if(secondsLeft <= 0)  
    // if (isQuizFinished()) {
    if (secondsLeft <= 0 || questionsComplete)  {
      // Stops execution of action at set interval
      clearInterval(timerInterval);

      // Calls function to endGame and display end game summary
      endGame();
    }

  }, ONE_SEC_IN_MILLISECS);

}


/**  
 * Options will be button child elements of parent element identified by choices.
 * Each button element will includde a customised 'data-correct' attribute set to "true" if option is correct answer
 * else set to "false"
 * Clears out choices before add any new ones.
 * @param {*} answerIdx 
 * @param {*} optionsArr 
 */
function displayAnswerOptions(answerIdx, optionsArr) {

    var isCorrect;  // is question correct or not
    var optionBtn;
    var questionNo=1;

    choices.innerHTML= ``;  // clear out before add answer buttons

    for(var idx=0; idx < optionsArr.length; idx++) {
        // create new button with option
        // add to html
        option = optionsArr[idx];
        var isCorrect =  answerIdx === idx;

        optionBtn =  document.createElement('button');
        optionBtn.setAttribute('class', 'choice');
        optionBtn.setAttribute('value', option);
        optionBtn.setAttribute(`data-correct`, isCorrect);
    
        optionBtn.innerText = `${questionNo}.  ${option}`;

        choices.appendChild(optionBtn);
        questionNo++;
    }
} 


/**
 * Displays question (text and choices) from passed in question object.
 * @param {*} currQuestion expecting object with properties (question_text(string), options (array), answerIdx(int))
 */
function displayQuestion(currQuestion) {

    var question_text = currQuestion.question_text;
    var optionsArr = currQuestion.options;
    var correctAnswerIdx = currQuestion.answerIdx;      // idx of correct answer within  optionsArr 

    questionTitle.innerText = question_text; 
    displayAnswerOptions(correctAnswerIdx, optionsArr);
}


/**
 * 
 * @returns true if either no more time left (checking global var) or questions have all finished.
 * Otherwise returns false.
 */
 function isQuizFinished() {
    if(secondsLeft > 0 && !questionsFinished()) {
        return false;
    } else {
        return true;
    }
}



/**
 * Uses global var currentQuestionIdx to fnished displaying all questions.
 * @returns true if all questions have been displayed,  otherwise false is returned.
 */
function questionsFinished() {

    if (currentQuestionIdx < questions.length-1) {
        return false;
    } else {
        return true;
    }
}


/**
 * Determines if next question should be displayed
 * Displays next quetsion (identified by global var currentQuestionIdx)
 * iff there is time left (timer has not yet reached 0)
 * TODO: What if no time left...do we need to do anything?
 */
function displayNextQuestion() {

    //if(secondsLeft > 0 && !questionsFinished()) {
    // IA 6/12 if (!isQuizFinished()) {

    if (!questionsFinished()) {
        currentQuestionIdx++;
        displayQuestion(questions[currentQuestionIdx]);
    } 
}



/**
 * Event listeners
 */

/**
 * Start button click will trigger the sets up page for start of game, starts timer countdown
 * whilst displaying the first question on the section of the page identified as start screen.
 */
startBtn.addEventListener('click', function() {

    startGame();
    setTime(); 
    displayQuestion(questions[currentQuestionIdx]);
});



/**
 * Using the element that generated the passed in eventObject, checks if  chosen answer is correct.
 *  - based on the elements custom attribute data-correct.
 * Once checked an appropriate sound will be placed and feedback msg displayed for short time.
 * Additionally, if incorrect, time will be deducted.
 * 
 * @param {Checks if} event 
 */
function checkAnswer(event) {

    var msg;
    var audio;
    // Check custom attribute to see if clicked element is correct answer
    var isCorrect = event.target.getAttribute('data-correct');
  
    if (isCorrect==="true") {
        audio= AUDIO_FILE_CORRECT;
        msg = MSG_FEEDBACK_CORRECT;
    } else {
        audio= AUDIO_FILE_WRONG;
        msg = MSG_FEEDBACK_WRONG;
        if (secondsLeft >= TIME_DEDUCTED_WRONG_ANSWER) {
            secondsLeft = secondsLeft - TIME_DEDUCTED_WRONG_ANSWER; 
        } else {
            secondsLeft = 0;
        }
    }
    audio.play();
    displayFeedback(msg);

    // Clear feedback msg after timeout
    setTimeout(clearFeedback, FEEDBACK_DISPLAY_DURATION);
};


/**
 * 
 * @param {} msg 
 */
function displayFeedback(msg) {
    feedback.innerText= msg;
    show(feedback);
}

function clearFeedback() {
    feedback.innerText= '';
    hide(feedback);
}

/**
 * 
 */



/**
 * Triggered on parent element wrapping choice buttons - where event bubbles up to parent listening to it.
 * Checks answer, displays feedback, decrements timeLeft if wrong answer, moves onto display next question
 */
choices.addEventListener('click', function(event) {

    checkAnswer(event);
    //IA 6/12 if (!isQuizFinished()) {

    if (!questionsFinished()) {
        displayNextQuestion();
    }  else {
        questionsComplete = true;
        endGame();  
    } 
});



/**
 * Event listener on submit button to submit initials and final score and save into local storage
 * Need to watch day 4 recording for full details.
 * Take the intials entered by user along with final score and records score if this is the highest 
 * score player has been so far awarded.
 * Refreshes to show the high scores page with all recorded highest scores.
 *
 */
 submitBtn.addEventListener('click', function () {

    try {
        var player_initials= getPlayersInitials();  // what if players returns null
        var player_score = getFinalScore();

        recordHighScore(player_initials, player_score);   
        window.location.href = PATH_TO_HIGHSCORES_PAGE;
    } catch (err) {
        alert(err.message);
    }
 })


