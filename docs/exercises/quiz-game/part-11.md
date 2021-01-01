# Quiz Game - Part 11

Add a WebSocket to connect to the backend.
You will need to use `express-ws` to add WebSocket support for your Express app.
We will just have a simple functionality of
counting and displaying (e.g., in the homepage) the number of online players.
Every time a player connects (does not need to log in), the counter should go up by 1.
When s/he disconnects, the counter should go down by 1.  
For example, during development/testing, if you open the homepage with Chrome, the counter
should show 1. When then you open the same page with Firefox, the counter should be 2 on
both browsers (Chrome would then be automatically updated with WebSocket).
When then you shut down Firefox, the counter in Chrome should go down to 1.


Solutions to this exercise can be found under the *exercise-solutions* folder. 