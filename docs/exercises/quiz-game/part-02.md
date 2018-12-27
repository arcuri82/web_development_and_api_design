# Quiz Game - Part 02

Create a new folder, in which you need to start a new JS project by creating
a `package.json` file (you can use the command `yarn init -y`).

The project should have the following folders (similar to what seen in class):
* `public`: containing all static assets, like HTML, CSS and bundled JS.
* `src`: containing your JS source code.
* `tests`: containing tests.

Copy over the HTML and CSS files from the previous exercise into the `public` folder.

Split the JS code from previous exercise into two different files: `index.js`
and `quizzes.js`.
This latter should contain your array of pre-defined quizzes.
Create a new function called `getRandomQuizzes`, that takes as input an integer
`numberOfQuizzes` and returns a new array of *unique* quizzes chosen at random.
It should throw an exception when  `numberOfQuizzes`  is invalid.
The main `index.js` file should import `getRandomQuizzes` from `quizze.js`.

Add *WebPack* to create a `bundle.js` file, to be generated into the `public` folder.
The `index.html` will use this JS bundle file.
Note: be careful of how JS functions can be exported in *WebPack*, as you will need to
use them from the HTML.

Configure *Jest* in `package.json`.
Add a *Jest* test file called `quizzes-test.js` in the `tests` folder.
Add tests to it to achieve 100% code coverage on `quizzes.js`.
You need to add *Babel* (i.e., `.babelrc`) with `env` preset to be able to run the tests in NodeJS.

In the `package.json`, besides adding all the needed dependencies
(e.g., *WebPack*, *Jest* and *Babel*), add the following 3 commands under `scripts`:
* `"test": "jest --coverage"`
* `"dev": "webpack-dev-server --open --mode development"`
* `"build": "webpack --mode production"`

From command-line, first install all needed dependencies with `yarn install`.
Then, run all tests with `yarn test`.
Finally start the application in debug mode with `yarn dev`.


Solutions to this exercise can be found under the *exercise-solutions* folder.