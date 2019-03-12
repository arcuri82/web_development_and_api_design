# Quiz Game - Part 09

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


Add a WebSocket to connect to the backend. 
You will need to use `express-ws` to add WebSocket support for your Express app.
We will just have a simple functionality of 
counting and displaying (e.g., in the homepage) the number of online players.
Every time a player connects (does not need to log in), the counter should go up by 1.
When s/he disconnects, the counter should go down by 1.  
For example, during development/testing, if you open the the homepage with Chrome, the counter
should show 1. When then you open the same page with Firefox, the counter should be 2 on 
both browsers (Chrome would then be automatically updated with WebSocket).
When then you shut down Firefox, the counter in Chrome should go down to 1.  


Solutions to this exercise can be found under the *exercise-solutions* folder. 