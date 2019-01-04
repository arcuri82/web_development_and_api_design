# Quiz Game - Part 04

Create a new file called `match.jsx`.
Move most of the code from `index.jsx` into `match.jsx`.
The component `<Match/>` will deal with rendering a quiz,
whereas the component `<App/>` in `index.jsx` simply 
uses `<Match/>` and calls `ReactDOM.render()`.

Create a new `match-test.jsx` test file for the `<Match/>` component.
You need to use *Jest* and *Enzyme*.
To setup *Enzyme* in *Jest*, you can just copy&paste the `jest-setup.js` configuration
file from class, and update the `package.json` accordingly.
Pay particular attention on how to handle the `alert()` function in JS,
which you will need to manually define in the `global` scope.
Write enough tests to achieve at least 80% statement coverage for `match.jsx`.


Solutions to this exercise can be found under the *exercise-solutions* folder.
