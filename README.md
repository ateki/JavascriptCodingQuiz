# JavascriptCodingQuiz
Javascript starter project - presenting a quiz made up of Javascript coding questions
with multiple choice answers.

## Description
Player is expected to play against the clock - with time starting when player commences play.
For each wrong answer, time is deducted by 10 seconds.
<br>

The game ends when either time runs out (reaches 0) or there are no more questions to present to player.
The final score is the seconds remaining on the clock - or 0 if no answers are correct and/or time runs out.
<br>

Once play has finished, the player is prompted for initials and their score is stored in browser's localStorage.

At this stage validation of their initials input will include:
    - checking for no null and 
    -  alpha only characters.
If user does any of the following, their error will appear in a popup dialog and the will then be given opportunity to reneeter initials.

    -   enters empty string, 
    -   submits score before entering initials or 
    -   enters numeric characters for initials, the will be alerted to
their error in a popup dialog and they are given opportunity to reenter.

Note only players highest score will ever be recorded.
No duplicate entries for players initials will ever be loaded into high scores record.

<br>
Player will be presented with option to clear all highscores (from local storage) as well as navigate between quiz/highscores view.



The basic program makes  use of use:

- html and css (minimal)
- basic javascript



## Usage
Live app can be found at https://ateki.github.io/JavascriptCodingQuiz

### Home page
The following page will be displayed. <br>

<div> <img src=assets/images/home_quiz_start.png alt="Home Screen"  style=" margin-right: 10px; border: 2px solid #555;"  />
</div>


## Screenshots
From the moment user selects start quiz from home page, a series of questions will appear with multiple choice answers listed.



Example question page: 
<img src=assets/images/question_example.png alt="Example question prompt"  style=" margin-right: 10px; border: 2px solid #555;" /> <br>

As player selects an answer, they are moved onto the next question with a feedback string appearing in at the bottom of each question (for short time).<br>
<img src=assets/images/question_feedback_example.png alt="Example question prompt" style=" margin-right: 10px; border: 2px solid #555;" /> <br>


Finally the game ends when either:
<ul>
    <li>time runs out (reaches 0)</li>
    <li>user has attempted all questions</li>
</ul>

At this point, the following end game view appears.  The final score displayed is the number of seconds remaining on the clock (or 0 if the player got 0 answers correct.) 


At this point the user  is expected to enter initials and submit their final score
The user is then taken through a number of simple javascript popups to determine their password criteria to confirm whether or not various char set types have to be included in password.
<img src=assets/images/end_game_view.png alt="End of game and final score view"  style=" margin-right: 10px; border: 2px solid #555;"/>


If user does not input alpha initials, an error alert window will appear and another attempt will be given:
 a string (made up of)



The folloing high scores page shows all high scores recorded in browser local storage.  No duplicate players will ever be recorded.
Displays entries ordered by score (highest descending).
Player can navigate to this view either from the above end game view (see screen shot above) when they hit submit button.
Else from the "View Highscores" option on the top right of the main game window.

<img src=assets/images/highscores_example.png alt="View of highscores"   style=" margin-right: 10px; border: 2px solid #555;" />



From this view player can return back to the start of a new game or clear high scores from local storage.
Once all highscores are cleared from local storage, the highscores view will be empty only with a GoBack button.
THe user will not be given the chance to clear an empty highscores table at any point.
<img src=assets/images/empty_highscores_view.png alt="Empty highscores view"   style=" margin-right: 10px; border: 2px solid #555;" />


## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

