# Express Template

Yet another Express template with security, performance and best practices in mind.

## Table of contents

- [Technologies](#technologies)
- [Set Up](#set-up)
- [Folder Structure](#folder-structure)

## Technologies

- [Node.js](https://nodejs.org)
- [Express](https://expressjs.com)
- [Jest](https://jestjs.io)
- [Babel](https://babeljs.io)

## Set Up

- ### Clone the repo

      git clone https://github.com/HanMoeHtet/express-template.git

- ### Install node depedencies

      cd express-template && yarn install

- ### Use set-up script to configure

  This step is optional. Use below command to generate .env files and to change app name in package.json and public/index.html files.

      node ./scripts/setup.js <your app name here>

- ### Or configure manually

  - If you skipped the previous step, make sure to create .env, .env.production and .env.test files in project root folder and copy the content of .env.example file into them.
  - Change express-template to your app name in name and scripts.pm2 of pacakge.json file.
  - Change express-template to your app name in public/index.html file

- ### Fill in environment variables

  - Edit .env, .env.test and .env.prduction files and fill in the values based on the example from .env.example.

- ### Finally run the app in development mode

      npm run start

- ### To run the tests
      npm run test:watch
- ### To generate build folder to serve in production

      npm run build

- ### To serve the build folder in production

      npm run serve

- ### Or if you like to use process managers to eliminate down time of your app in production

      npm run pm2

- ### Recommendations:
  - Delete .git folder and re-init git

## Folder Structure

- ### public

  contains all the static files

- ### scripts

  contains all the scripts used for productivity and not by app itself

- ### src

  contains all the source code for app

  - ### config
    contains all the configuration files
  - ### http
    contains all the http controllers, exceptions and middlewares
  - ### routes
    contains all the routes
  - ### utils
    contains all the utility functions

- ### storage

  contains all files stored by the app (logs, user generated files, etc)

- ### test

  contains all the tests

  - ### integration
    contains all the integration tests
  - ### unit
    contains all the unit tests

- ### .env.exmaple

  an example of the .env file

- ### jsconfig.json
  tsconfig.json but for JavaScript. Only used by the IDEs and Editors.
