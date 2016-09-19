#### Starter project for Angular 2, Webpack 2, Material Design 2, and optional server-side rendering with Universal.

```
git clone https://github.com/qdouble/angular2webpack2-starter.git
cd angular2webpack2-starter
npm install
npm start
```

## Features
* Angular 2
* Webpack 2
* TypeScript 2
  * @types
* Material Design 2
* Universal (Server-side Rendering)
  * Async loading
  * Treeshaking
  * AOT (Ahead of Time/ Offline) Compilation
  * AOT safe SASS compilation
* Karma/Jasmine testing
* Protractor for E2E testing

## Project Philosophy & Goals

 There are debates whether or not to keep starter seed projects minimal. After working on it and thinking about it for a while, the philosophy of this project is:
* There are more than enough minimal starters out there, there's no need for to replicate them here.
* The main goal is to provide an environment where you can have great dev tools and create a production application without worrying about adding a bunch of stuff yourself.
* The goal of your design should be so that you can easily copy and paste your app folder and your constants file into to a new update of this project and have it still work. Use constants and have proper separation to make upgrades easy. If you have any suggestions on areas where this starter can be designed to make updates more easy, file an issue.

## Basic scripts

Use `npm start` for dev server. Default dev port is `3000`.

Use `npm run server:prod` for production server and production watch. Default production port is `8088`.

Use `npm run prod:build` for production build.

Use `npm run universal` to run production build in Universal. Default universal port is `8000`.

Default ports can be changed in constants.js file.

To create AOT version, run `npm run compile`. This will compile and build script.
Then you can use `npm run prodserver` to see to serve files.
Do not use build:aot directly unless you have already compiled.
Use `npm run compile` instead, it compiles and builds:aot

The scripts are set to compile css next to scss because ngc compiler does not support Sass.
To compile scss, use `npm run sass`, but many of the scripts will either build or watch scss files.

### AOT  Don'ts

The following are some things that will make AOT compile fail.

- Don’t use require statements for your templates or styles, use styleUrls and templateUrls, the angular2-template-loader plugin will change it to require at build time.
- Don’t use default exports.
- Don’t use form.controls.controlName, use form.get(‘controlName’)
- Don’t use control.errors?.someError, use control.hasError(‘someError’)
- Don’t use functions in your providers, routes or directives, export a function and then reference that function name

### Testing

For unit tests, use `npm run test` for continuous testing in watch mode and use
`npm run test:once` for single test. To view code coverage after running test, open `coverage/html/index.html` in your browser.

For e2e tests, use `npm run e2e`. To run unit test and e2e test at the same time, use `npm run ci`.
