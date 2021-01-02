# Quiz Game - Part 09

In this part, we will start to add authentication to the application.
The server needs to be extended to use Passport for handling auth,
based on HTTP sessions via cookies.
You will need to add the following dependencies:
`express-session`, `passport` and `passport-local`.

Users' ids and passwords will be saved in memory, in a map.
**WARNING**: in this course, we do not focus on the backend, in particular
the storage of data in SQL and NoSQL databases. Passwords should **NEVER** be
stored in plain text, but hashing of passwords (plus *salt&pepper*) is not something
we will see in this course.  

In the REST API, you need new endpoints to handle auth actions like:
*login*, *signup* and *logout*.
You also need an endpoint to retrieve the current info on the logged-in
user: id, and numbers of victories and defeats.

Note 0: these latter two can be left to 0 for now, as we do not have yet a (secure) way
to notify the backend when a user wins or loses.

Note 1: you must NOT return the password in the user-info endpoint...

Add `SuperTest` tests for the auth API. Most of them will just be adaptations
from the tests used in the lesson examples. 

The starting of a match (i.e., retrieving a random sample of quizzes) 
should only be possible if a user is logged-in.
Current `SuperTest` test will hence fail.
Update such test to verify that indeed accessing a match without being logged-in
does fail.
Add a new test in which you can successfully retrieve a random sample of quizzes
after a successful sign-up.


Update your frontend React pages to support auth.
You need a new page for sign-up, and one for log-in.
You need a common header-bar for all pages in which you display the 
log-in/sign-up buttons if a user is not logged-in, or a welcome message
and a logout button otherwise. 
A user should be able to start a new match only if s/he is logged-in.
If logged-in, display current number of victories and defeats (note: those
for now will always be 0, regardless of number of actual victories/defeats). 

Current React tests might fail, as playing a match does
require to be logged-in. Update all these tests to handle authentication.



Solutions to this exercise can be found under the *exercise-solutions* folder. 