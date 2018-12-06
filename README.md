# Web Development and API Design


![](docs/img/stephen-leonardi-369733-unsplash-compressed.jpg "Photo by Stephen Leonardi on Unsplash")

## Summary

This repository contains all the material used in the PG6300 course 
on *Web Development and API Design*, taught at 
the university college [Høyskolen Kristiania](https://kristiania.no/), Oslo, Norway.

The goal of this course is to teach the principles of *Single-Page-Applications* (SPA)
and the basics of web services (e.g., *REST* and *GraphQL*) and *web-sockets*.

The programming language used in this course is *JavaScript*, with *NodeJS* as runtime.
Some of the used technologies are: *YARN*, *WebPack*, *Babel*, *React*, *React-Router*, 
*Jest*, *Express*, *Apollo*, *Socket.io* and *Passport*. 

This course puts particular emphasis on **testing** and **security**, but not on 
frontend *design* (i.e., UI/UX).

This course focuses on the *frontend* side of web development, albeit
we will build full-stack applications (but no databases).
To learn more about *backend* development (e.g., using *Java/Kotlin*), you can see this
other repository: [Testing, Security and Development of Enterprise Systems](https://github.com/arcuri82/testing_security_development_enterprise_systems).

The course is divided in 12 lessons, each one lasting between 2 and 4 hours.
Each lesson contains slides and full working code examples. 

## Lessons

* **Lesson 01**: Intro and JavaScript

  Slides: [PDF](docs/slides/lesson_01.pdf)  

  Exercise: 

<br />

* **Lesson 02**: NPM and Unit Tests

  Links:
  * [NPM](https://www.npmjs.com/) 
  * [YDKJS](https://github.com/getify/You-Dont-Know-JS):
      sections *this & Object Prototypes* and *Types & Grammar*.
  
  Exercises: complete the JavaScript Koans.
  Add functionalities to *Tic-Tac-Toe*, like an AI for the opponent.

<br />

* **Lesson 03**: SPA Components and React

    Links:
   
    but only up to *Main Concepts* section.
    * [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
    
    Exercises: do the React Tutorial. 

<br />

* **Lesson 04**: Multi-component State and Component Tests 

    Links:
    

    Exercises: Add functionalities to *Connect4*, like an AI for the opponent 
    (could start with a simple one choosing at random).
    Add more tests.

<br />

* **Lesson 05**: SPA Routing

    Links:
    

    Exercises: create a new project similar to *Games*, where you use
    React-Router between the *Tic-Tac-Toe* and *Connect4* you extended
    in the previous exercises. 

<br />

* **Lesson 06**: Revision


<br />


* **Lesson 07**: Accessing Web Services

    Links:
    :
              section *Async & Performance*.

    Exercises: look at (http://www.programmableweb.com/).
               Select one API of your choice.
               Write a small React page in which you do a GET on an endpoint of such API
               and display its results.  

<br />

* **Lesson 08**: REST APIs

    Links:
    
              
    Exercises: write a small REST API using NodeJS/Express on a topic of your choice,
               with endpoints for at least: GET, POST, PUT and DELETE.
               Create a small React app that consumes such API. 


* **Lesson 09**: WebSockets

    Links:
    

    Exercises: on an app of your choice that you are building (e.g., any of the previous
    exercises), add the following functionality: display in the frontend the total number
    of users that are online. You will need to connect a WebSocket, intercept the events
    for "connect" and "disconnect" of each user, and broadcast the number of users at
    each new connect/disconnect.

<br />

* **Lesson 10**: Authentication and CSRF

    Links:
    

<br />

* **Lesson 11**: Online Multi-Player Game

<br />

* **Lesson 12**: On Bash, Docker, Databases and Cloud Deployment

    Slides: [PDF](docs/slides/lesson_12.pdf)


## Useful Links

* [You Don't Know JavaScript](https://github.com/getify/You-Dont-Know-JS)
* [JavaScript Koans](https://github.com/liammclennan/JavaScript-Koans)      
* [NodeJS](https://nodejs.org/)
* [YARN](https://yarnpkg.com)
* [WebPack](https://webpack.js.org)
* [Babel](https://babeljs.io/)
* [Loadash](https://lodash.com)
* [React](https://reactjs.org):
* [React-Router](https://reacttraining.com/react-router)
* [Jest](https://github.com/facebook/jest)
* [Enzyme](https://github.com/airbnb/enzyme)
* [SuperTest](https://github.com/visionmedia/supertest)
* [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.asp)
* [Express](http://expressjs.com/)
* [Socket.io](https://socket.io/)
* [Passport](http://www.passportjs.org/)
* [ProgrammableWeb](http://www.programmableweb.com/)


## Exam

A PDF of a mock exam for this course can be found [here](docs/pg6300_mock_exam.pdf). 

## License & Copyright

The materials herein are all Copyright (c) of [Andrea Arcuri](http://www.arcuriandrea.org) 
and contributors.
The material was/is produced while working at 
Westerdals Oslo ACT and Høyskolen Kristiania.

All the source code in this repository is released under 
[LGPL version 3 license](LICENSE).

<a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">
<img alt="Creative Commons License" style="border-width:0" 
src="https://i.creativecommons.org/l/by-nc-nd/4.0/88x31.png" /></a>
<br />
The documentation is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-nd/4.0/">Creative Commons Attribution-NonCommercial-NoDerivs 4.0 Unported License</a>.

