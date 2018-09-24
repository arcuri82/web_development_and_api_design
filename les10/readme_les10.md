# Notes

In `authentication`, you will see an example
of authentication/authorization handling in NodeJS.
The application simulates a trivial Bank, in which you can
open a new account and transfer money to someone else.


The `malware` module has different example pages of malicious
sites aimed at stealing money from Bank
via CSRF.
To run these examples, you need:

* Start `authentication` server.
* On authentication server, create an account for "eve",
  using a browser (let's call it `A`).
  Note: the name is very important, as hardcoded in the
  malicious HTML pages.
* On a __different__ browser than `A` (e.g., you could use
  Chrome and Firefox), which we can call `B`, open a new
  account with a username of your choice.
  Note: it is important to use a different browser to not
  share authentication cookies.
* On `B`, while still logged in, open the malware pages
  via a HTTP server. For example, in WebStorm, right-click
  on those HTML files and choose "Open in Browser".
* You should verify that both `index_ajax.form.html` and
  `index_ajax.form.html` do fail to steal money.
  Check in the console logs that this is due to CORS.
  However, `index_form.html` should manage to steal money.
  To see the stolen money, you will need to refresh the home
  page (and log in again) in both `A` and `B`.
