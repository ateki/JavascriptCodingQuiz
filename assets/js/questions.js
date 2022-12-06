// TODO: Likely remmove answerTxt as checking by using Idx - more prone to error therefore go with answerIdx

/**
 * Array of quiz question objects.
 * 
 */
const questions = [
      { question_text: "Commonly used data types DO NOT include:",
        options: ["strings", "booleans", "alerts", "numbers"],
        answerIdx: 2,         
        answerTxt: "alerts"  
      },

      { question_text: "The condition in an if / else statement is enclosed within ____.",
      options: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answerIdx: 1,
      answerTxt: "curly brackets"
      },

      { question_text: "Arrays in Javascript can be used to store ____.",
      options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answerIdx: 3,
      answerTxt: "all of the above"
      },
      
      { question_text: "String values must be enclosed within ____ when being assigned to variables.",
      options: ["commas", "curly brackets", "quotes", "parentheses"],
      answerIdx: 2,
      answerTxt: "quotes"
      },
      
      { question_text: "A very useful tool used during development and debugging for printing content to the debugger is:",
      options: ["Javascript", "terminal / bash", "for loops", "console.log"],
      answerIdx: 3,
      answerTxt: "console.log"
      }
    ]; 
  
  

