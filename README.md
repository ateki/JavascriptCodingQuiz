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
