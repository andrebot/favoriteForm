Favorite Form
=============
This is a form to save some of your favorite things!

Dependencies
------------

  * Angular 1.5;
  * Angular-Material;
  * ngRoute;
  * Angular-Local-Storage.

Setup
-----

This project was developed using [Node](https://nodejs.org/en/) **v5.3.0**.

It is adivisable to use a version manager in case you have another Node environments in
your machine. I suggest [NVM](https://github.com/creationix/nvm).

This project needs [Gulp](http://gulpjs.com/) and [Karma](https://karma-runner.github.io/0.13/index.html) installed. You can installed them as you wish or use this command in the root folder:

`npm instal-globals`

To install all dependencies to run this app just execute this command in the root folder:

`npm install`

Run
---

To run the application just execute this command in the root folder:

`gulp run`

This will setup the development environment, with the watch option. Or you can just execute this other command for a standard deploy:

`gulp`

Tests
-----

The test suite used was Karma+Jasmine. To run the tests you can use this command (in case you installed karma-cli by executing `npm install-globals`):

`gulp build && karma start` or `npm test`

**Obs:** We use the compiled files to run the tests to have the same environment as 
"production" and to be easier to configure Karma.

**Obs2:** You might face some issues running Karma after you installed *karma-cli*. This is 
due to *karma-cli* might install Karma into the NPM's global scope, making karma-cli loose 
its correct contex. To fix this problem just uninstall karma-cli and karma (locally and 
globally) and reinstall them (karma locally then karma-cli goblally).

I did not implemented any [Protractor](http://www.protractortest.org/#/) because I have 
never worked with it.

Final Comments
--------------

I don't have much experience with [Angular Material](https://material.angularjs.org/latest/),
so I spent some time understanding all the "layout" effects. The main container in the 
application don't have the margins as it is shown in the wireframe because, once I triggered
the modals/gridsheet/alert, I faced a bug where the content would stretch outside the browser
limits, giving a wierd stretch sensation breaking the whole layout. I couldn't fix it in time
so I decided to not fix it.

Jshint was configured to be as simple as possible, so that I had the minimal care for code
standard.

Gulp is the one responsible for creating the WebServer, I didn't implement a Node server.

Did not minify the code or use gzip, because I didn't had time to configure a production 
deploy task in gulp in the end, as I thought I would.

Did not use Babel to translate ES6 to ES5 because I was too lazy to do it, it would take 
more time than I had.
