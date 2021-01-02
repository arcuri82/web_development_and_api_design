# Quiz Game - Part 10

In the game implemented so far, it is easy to cheat, as a user does get in
the browser all the info regarding the quizzes, including the right answers.
We will start by fixing this.


In the backend, we need some data structure representing ongoing matches.
A user can have only 1 active match at a time.
Trying to start a new match, when an ongoing one is not finished yet, 
must forfeit such ongoing match (and so it will count as a defeat).
Otherwise, a user could cheat by starting a new match when s/he does not
know the answer for the current ongoing one.  


The REST API dealing with the matches needs to be extended/updated.
We will no longer return all the quizzes for a match, but rather 1 quiz at a time.
For example, in a match composed of 5 quizzes, when the match starts a user should only get
the first quiz.
It is important that the info of the quiz (e.g., question and answers) does not contain the
identifier of the right answer.

`POST /matches`: create a new match for the current logged-in user. If a match was already
ongoing, forfeit. Return info for the first quiz in the match.

`GET /matches/ongoing`: return info for the current quiz in the match.

`POST /matches/ongoing`: answer the current quiz in the match, but only if there is an ongoing
match. If the answer was wrong, or if it was right and this was the last quiz, then deal with
the ending of the match. 

Update the React frontend to handle such changes in the REST API.
In particular, make sure that the display for the number of victories and defeats is properly
updated with the right values.

After all these changes, some of the current tests might fail. Update them to keep into
account such changes in the semantics of the app. 


Solutions to this exercise can be found under the *exercise-solutions* folder. 