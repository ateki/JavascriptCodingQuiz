// TODO: FIX following error and remove TEMP WORKAROUND. 
// Currently all high scores code, event listeners and helper functions are in scores.js (for modularity)
// However logic.js needs to call  'recordHighScore'   to provide functionality behind submit of index.html (at the end of the game). 
// Attempted to modularise with import/export however having issue with Chrome giving
// error "Access to script at ... logic.js fro origin 'null' has been blocked by CORS policy".  
// For now TEMP WORKAROUND:  load all of scores.js in index.html but when loaded from here clearBtn will be null
// as not required in index.html.  TEMP WORKAROUND checks if null and only uses if !null.
// TODO:Similar check to see if scoresListEl is null or not onLoad()

/**-------------------------------------------------------------
 * 
 * Filename: scores.js
 * Desc:
 * Logic for recording high scores, saving and displaying.
 * Along with event listeners associated with highscores
 * Author: Irene Atek
 * --------------------------------------------------------------
 */
  


/**
 * Global constants
 */
const LOCAL_STORAGE_KEY_HIGHSCORES = "highscores";


/**
 *  Query Selectors 
 */
var scoresListEl = document.getElementById('highscores'); 
var clearBtn = document.getElementById('clear');


 
/**-----------------------------------------------------------------
 * 
 * Class Definitions
 * 
 * -----------------------------------------------------------------
 */

/**
 * Class used  to represent each high score recorded over time and 
 * held in the local Storage.
 */
class HighScoreObject {
    constructor(initials, score) {
        this.initials = initials;
        this.score = score;
    }
}


/** -----------------------------------------------
 * Local Storage specific high score helper functions  
 * -------------------------------------------------- 
 */


/**
 * 
 */
function createNewHighScoresObj(initials, score)  {
    return new HighScoreObject(initials, score);
}


/**
 * Returns array of objects where each object expected to be of class type HighScoreObject.
 */
function retrieveHighScoresFromStorage() {
    var arrHighScores = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY_HIGHSCORES));
    return arrHighScores;  
}


/**
 * Removes all high score info recorded in local storage.
 */
 function clearHighScoresFromStorage(scoresArr) {
    localStorage.removeItem(LOCAL_STORAGE_KEY_HIGHSCORES);
}


/**
 * Assumes passing in array of HighScore objects, sorts by high score descending and saved into local storage.
 */
function saveHighScoresToStorage(scoresArr) {

    //  sort by high score
    scoresArr.sort(function(a,b){return b.score - a.score});

    var arrHighScores = localStorage.setItem(LOCAL_STORAGE_KEY_HIGHSCORES, JSON.stringify(scoresArr));

    return arrHighScores;  
}




/** ---------------------------------------------------------------
 * High score helper  functions
 * ---------------------------------------------------------------- 
 */

/**
 * Records provided details (player_initials,score) in localStorage 
 * Ensures takes into consideration any prev highscores recorded in LocalStorage
 * Scenarios considered: 
 *      -   first high score to be recorded, 
 *      -   first high score to be recorded against given player_initials,
 *      -   and finally where player already has existing high score, only updates with new score if new score is the highest.
 * THere should only ever be one single entry for same player.
 * When retrieving highscores from localStorage, JSON.parses back into array of objects.
 * @param {*} player_initials 
 * @param {*} score 
 */
 function recordHighScore(player_initials, score) {
    var update = false;
    var foundExistingScore = false;
    var arrHighScores = retrieveHighScoresFromStorage();

    if (arrHighScores==null) {
        arrHighScores = [];
    } else {
        // Update with new initials/score if appropriate
        for (var i = 0; i< arrHighScores.length; i++) {
            prevRecordedScoreObj =  arrHighScores[i];

            if (player_initials == prevRecordedScoreObj.initials) {
                // player_initials has prev score recorded
                foundExistingScore = true;
                if (prevRecordedScoreObj.score >= score) {
                    // players new score not an improvement
                    update=false;
                    break;          // stop checking other recorded scores as only 1 ever held
                } else {
                    // update player's existing score with new score 
                    arrHighScores[i].score = score;
                    update=true;
                    break;  
                }
            } 
        }
    }

    if (!foundExistingScore) {
        // First entry in high scores for player_initials -add score and initials
        arrHighScores.push(new HighScoreObject(player_initials, score));
        update=true;
    }

    if (update) {
        // new high scores array to be stored
        saveHighScoresToStorage(arrHighScores);
    } 
}


/**
 * Retrieves high scores from local storage and populates elements on page
 */
 function displayHighScores() {

    var scoreLi;
    var highScoresArray = retrieveHighScoresFromStorage();
    if (highScoresArray != null) {

        for ( let highScoreObj of highScoresArray) {

            scoreLi = document.createElement('li');
            scoreLi.textContent = `${highScoreObj.initials} - ${highScoreObj.score}`; 
            scoresListEl.appendChild(scoreLi);
        }
    }   else {
            if (clearBtn!=null) { clearBtn.setAttribute('class', 'hide');} // TEMP WORKAROUND
    }
 }


 /**
  * Helper function to process clear high score request.
  * - Removes all scores from localStorage,
  * - clears out prev scores listed on page
  * - hides clear high scores button
  */
  function clearHighScores () {
    clearHighScoresFromStorage();
    // clear all prev children
    scoresListEl.innerHTML = '';

    //  hide clearHighscores button
    if (clearBtn!=null) {    //TEMP WORKAROUND
        clearBtn.setAttribute('class', 'hide');
    }
 }




/** ----------------------------------------------------------------
 * Event Listeners
 * ----------------------------------------------------------------
 */

 /**
 * Click Event Listener placed on clearButton to trigger clear high scores button
 * TEMP WORKAROUND only load event listener on clearButton if clearButton exists
 * as scores.js needs to used/loaded for some html pages with no clear button (ie: index.html)
 */
  
if (clearBtn!=null) {       //TEMP WORKAROUND
    clearBtn.addEventListener('click', clearHighScores);
}

  

/** OLD ANON FUNCTION  TODO REMOVE
 * Place event handler on parent of lis - ie: div id=choices
 * Clears local storage of high scores.
 */
/*  clearBtn.addEventListener('click', function(eventObject) {
    
    clearHighScoresFromStorage();
    // clear all prev children
    scoresListEl.innerHTML = '';
    //  hide clearHighscores button
    clearBtn.setAttribute('class', 'hide');
 }) */



/** ------------------------------------------------
 * 
 *  Runs on load of  this javascript file.
 * 
 * TEMP WORKAROUND - as unable to export recordHighScore from here to logic.js
 * the scores.js file is being loaded as part of index.html.
 * For now need to ensure doesnt try to load high scores on index.html
 * -------------------------------------------------
 */
function onLoad() {
    if (scoresListEl!=null) {   // TEMP WORKAROUND
        displayHighScores();
    }
 }

 /**
  * on load of javascript
  */

 onLoad();


/* export {recordHighScore};  */// so logic.js can use it    <!-- MODULE modification -->
