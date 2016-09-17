# Starter Project for Angular 2, Webpack 2, Universal, and Material Design 2
> A complete Angular 2 Seed featuring Angular 2 and Webpack 2 with AOT and Lazyloading.

```
git clone https://github.com/qdouble/angular2webpack2-starter.git
cd angular2webpack2-starter
npm install
npm start
```

## Features
* Webpack 2
* TypeScript 2
  * @types
* Material Design 2
* Angular 2
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Karma/Jasmine testing
* Protractor for E2E testing

## Project Philosophy & Goals
 There are debates whether or not to keep starer seed projects minimal. After working on it and thinking about it for a while, the philosophy of this project is: 
* There are more than enough minimal starters out there, there's no need for to replicate them here.
* If this starter is designed based off what is a useful starting point for real projects that are being worked on, it will be easier to maintain and easier to implement best practices and tricks
* The main goal is to provide an environment where you can have great dev tools and create a production application without worrying about adding a bunch of stuff yourself.
* The goal of your design should be so that you can easily copy and paste your app folder and your constants file into to a seed new update of this project and have it still work. Use constants and proper seperation to make upgrades easy. If you have any suggestions on areas where on how starter can be designed to make updates more pluggable, file an issue.

## Basic scripts
Default dev port is `3000`.

Default production port is `8088`.

These can be changed in constants.js

The scripts are set to compile css next to scss because ngc compiler does not support Sass.
To compile scss, use `npm run sass`, but many of the scripts will either build or watch scss files.

Use `npm start` for dev server.

Use `npm run server:prod` for production server and production watch.

Use `npm run prod:build` for production build.


To create AOT version, run `npm run compile`. This will compile and build script.
Then you can use `npm run prodserver` to see to serve files.
Do not use build:aot directly unless you have already compiled.
Use `npm run compile` instead, it compiles and builds:aot

### AOT  Don'ts
The following are some things that will make AOT compile fail.
- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, 
the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or directives, export a function and then reference that function name

### Testing
For unit tests, use `npm run test` for continuous testing in watch mode and use
`npm run test:once` for single test. Code coverage results are output into `coverage` folder.

For e2e tests, use `npm run e2e`. To run unit test and e2e test at the same time, use `npm run ci`.
