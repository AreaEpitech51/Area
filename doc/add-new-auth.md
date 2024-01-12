# How to add a new authentication method with Lucia

## Setup

First, in app/api folder create a new folder with the name of your authentication method, for example: `app/api/google`.

Then, in this folder create a file called `route.ts`
this file will contain the route handler for your authentication method.

then create a folder called `callback` in this folder create a file called `route.ts`, this file will comunicate with the Database to store the account information when login.
