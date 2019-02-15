# Quiz Game - Part 07

Instead of relying on an external web service, you will need to develop your own REST API
to provide the quizzes.
You will still have a single HTTP server running NodeJS, serving both the static assets
of your React app (e.g., HTML/CSS/JS) and the JSON for the Quiz API.
Your JS code should be split between frontend (`src/client`) and backend (`src/server`).

In the `package.json` file, use the following script configurations:

    "test": "jest --coverage",
    "dev": "concurrently \"yarn watch:client\" \"yarn watch:server\"",
    "watch:client": "webpack --watch --mode development",
    "watch:server": "nodemon src/server/server.js --watch src/server --watch public/bundle.js",
    "build": "webpack --mode production",
    "start": "node src/server/server.js"

For "production" mode, you still need to first build the `bundle.js` with `yarn build`,
and then run the server with `yarn start`.
For "development" mode with `yarn dev`, the idea is to use `nodemon` to check changes
in your backend code (and restart the server in those cases), and rebuild the `bundle.js`
if there is any change in the frontend code (using WebPack in watch mode).
Furthermore, if `bundle.js` is re-built, you want to automatically restart the server as well.
Because we need two different processes checking for these changes (`nodemon` and `webpack`), those
need to be run concurrently.
All these tools need to be added as `devDependencies`. 


In your backend, you need to write a REST API to deal with quizzes. Given a list of existing
quizzes, at this point you just need to have a `POST` endpoint dealing with the selection
and retrieval of a random sample of quizzes (e.g., 3).
Note that most of the code you had in the frontend in `quizze.js` will now need to be
moved to the backend (e.g., the list of existing quizzes).

When in the frontend React app you need to start a new match, you will need to connect
to the REST API to get a random sample of quizzes for such match.

Note: at this point, it is still easy to cheat, as the JSON you get back would still
need to contain the indices of the right answers (and a user could just use the Developer
Tools in the browser to read such values). We will deal with this problem in the 
next exercises. 

Add at least one test for your REST API using the `SuperTest` library.    
Update all your frontend tests in a way that, when they need to do a `fetch` to the 
backend, then they should use `SuperTest` to connect to the backend (i.e., by using the utils
shown in class to define behavior of `fetch` when running tests in the backend).
Add enough tests to obtain an overall statement coverage of at least 70%.


Solutions to this exercise can be found under the *exercise-solutions* folder. 