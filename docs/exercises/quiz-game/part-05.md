# Quiz Game - Part 05

In your project, under `src` create two new folders: `client` and `server`.
Move your JavaScript code under the `client` folder, and update `webpack.config.js` accordingly
with the new path of your `index.jsx` file.

Add *React Router* to your project.
In `client`, create a new `home.jsx`. This should be your home page, with a welcome message,
and a button to go to the `match.jsx` page to a start a new match. 
You need to update your `index.jsx` to handle React routes between those 2 web pages.
Also handle the case of *404 not found*. 

In `match.jsx`, handle an actual game with *n* quizzes (e.g., *n=3*).
Instead of using `alert()`, now display a victory/defeat message in the page, 
with a button to start a new match.
Starting a new match will create a new selection of *n* quizzes.
When you display a quiz, you should also display its index in *n*, i.e., if *n=3*,
then for example for the first quiz you should display that it is the 1st out of 3.


In `server`, configure a *NodeJS* server with *Express*. It should server static assets
from the `public` folder, and `index.html` for `404 not found` cases. 
In the `package.json`, do add the script:

`"start": "node src/server/server.js"`

To run in production-mode via *NodeJS*, first you need to run `yarn build` to create the
`bundle.js` file, and then `yarn start` to start the server.
Note: in contrast with `yarn dev` that does use `WebPack` as a developer server, here you 
will not have hot-reload: ie, if you make changes, you need to re-run `yarn build && yarn start`
to be able to see them in the browser (after a refresh).


Update your tests to accommodate all the changes done in your frontend code.
Add new tests in `match-test.jsx` to achieve 100% code coverage.

Solutions to this exercise can be found under the *exercise-solutions* folder.
