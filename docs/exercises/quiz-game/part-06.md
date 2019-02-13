# Quiz Game - Part 06


In your game, you need to modify `quizzes.js` to rather use quizzes from an external web service.
Do not delete your current code, just comment it out / deactivate it for now (you will need it again
in the next exercises).
There are several web services available online.
Use Google or DuckDuckGo to search an API for quizzes, or use a specialized API search site 
like [https://www.programmableweb.com](https://www.programmableweb.com).  
 

The `getRandomQuizzes` will now be an `async` function, as needing to `await` on a `fetch()`
towards such external web service.
Note: the JSON that you will get back will likely not be with the same structure as how you
based your application (e.g., different field names). 
You will need to transform such quiz data from the external service
before you can use it in your `React` code.

When doing these modifications, your current tests will fail.
For now, ignore them, as in the next exercise we will do major changes again (i.e., we will write our own
web service for quizzes, instead of relying on an external one).

Solutions to this exercise can be found under the *exercise-solutions* folder.
However, the solutions rely on an external service, which could go down or change its API at any
moment. So the solutions could fail to work. In such a case, please create an `issue` on the GitHub
page of this project. 


