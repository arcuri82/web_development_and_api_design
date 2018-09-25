# PG6300
Code for the PG6300 course on *Web Development and API Design*.

## Lessons

* **Lesson 01**: Intro and JavaScript

  Slides: [PDF](docs/slides/lesson_01.pdf)  

  Links:
  * [JavaScript Koans](https://github.com/liammclennan/JavaScript-Koans)      
  * [YDKJS](https://github.com/getify/You-Dont-Know-JS)
    sections *Up & Going* and *Scope & Closures*.  

  Exercise: do JavaScript Koans, at least up to `about_arrays.js`.

<br />

* **Lesson 02**: NPM and Unit Tests

  Links:
  * [NodeJS](https://nodejs.org/en/)
  * [NPM](https://www.npmjs.com/) 
  * [YDKJS](https://github.com/getify/You-Dont-Know-JS):
      sections *this & Object Prototypes* and *Types & Grammar*.
  * [WebPack](https://webpack.js.org/guides/getting-started/#basic-setup)
  * [Babel](https://babeljs.io/)
  * [Jest](https://github.com/facebook/jest)
  * [Loadash](https://lodash.com)

  Exercises: complete the JavaScript Koans.
  Add functionalities to *Tic-Tac-Toe*, like an AI for the opponent.

<br />

* **Lesson 03**: SPA Components and React

    Links:
    * [React](https://reactjs.org/docs/thinking-in-react.html):
    but only up to *Main Concepts* section.
    * [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
    
    Exercises: do the React Tutorial. 

<br />

* **Lesson 04**: Multi-component State and Component Tests 

    Links:
    * [Enzyme](https://github.com/airbnb/enzyme/blob/master/docs/api/mount.md)
    * [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp)

    Exercises: Add functionalities to *Connect4*, like an AI for the opponent 
    (could start with a simple one choosing at random).
    Add more tests.

<br />

* **Lesson 05**: SPA Routing

    Links:
    * [React-Router](https://reacttraining.com/react-router)

    Exercises: create a new project similar to *Games*, where you use
    React-Router between the *Tic-Tac-Toe* and *Connect4* you extended
    in the previous exercises. 

<br />

* **Lesson 06**: Revision


<br />


* **Lesson 07**: Accessing Web Services

    Links:
    * [YDKJS](https://github.com/getify/You-Dont-Know-JS):
              section *Async & Performance*.

    Exercises: look at [http://www.programmableweb.com/](http://www.programmableweb.com/).
               Select one API of your choice.
               Write a small React page in which you do a GET on an endpoint of such API
               and display its results.  

<br />

TODO: rest of the classes

## Useful NPM Commands

* **npm init -y**

  To create a new project, in particular the *package.json* file.

* **npm install**

  To download and install under *node_modules* all the needed libraries
  specified in the *package.json* file.
  Note: instead of installing libraries via NPM commandline, you
  can modify the *package.json* file manually.

* **npm run X**

  Execute the script called `X`  in the `scripts` section of
  the the *package.json* file.

* **npm install webpack webpack-cli webpack-dev-server --save-dev**

  To install WebPack.

* **npm install jest babel-jest babel-cli babel-core babel-preset-es2015 --save-dev**

  To install *Jest* with *Babel* support.
  Needed when writing frontend code, but then tests are run on
  *NodeJS*. So, need to make sure to use *Babel* to transform the
  module import statements.

* **npm install react react-dom react-router-dom**

  To install *React* libraries.

* **npm install babel-core babel-loader  babel-preset-react  --save-dev**

  To install *Babel* to handle the JSX files used by *React*.
  
* **npm install express cors**
  
  To install Express and CORS, needed to build REST APIs on NodeJS.

* **npm install socket.io socket.io-client**

  To install support for WebSockets, both for servers and clients.