# Quiz Game - Part 01


We are going to build a web application to play a Quiz Game.
Each week, we will do a small incremental piece, based on what learned in class.
Here, we will start by a simple static version, using vanilla JavaScript, with
no libraries.

In a new folder, create 3 files:
* *style.css*: CSS style file.
* *code.js*: where you will have the JavaScript code running the game.
* *index.html*: a web page for the Quiz Game, accessing the other 2 files.


In *code.js*, create an array of quizzes. A quiz is composed of:
* A question.
* 4 possible answers.
* An integer representing which of the 4 answers is the correct one.

Populate such array with a few quizzes of your choice.

When a user open *index.html*, one random quiz should be displayed (you
can use JS built-in functions like *Math.random()*).
Each of the 4 answers should be a clickable button.
Clicking the right answer should display a victory message (e.g., using
the JS *alert()* function), and then display a new random quiz.
On the other hand, clicking on a wrong answer should display an error message.

To manipulate the DOM, you will likely need to use *document.getElementById()*
to refer to element-tags in the HTML, and then manipulate their content by changing
their *innerHTML*.

Solutions to this exercise can be found under the *exercise-solutions* folder.