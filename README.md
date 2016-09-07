# Starter Seed Project for Angular 2 using Nightly Builds, Material Design and Webpack 2
> A simple Angular 2 Seed featuring Angular 2 and Webpack 2 with AOT and Lazyloading.

```
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

Default dev port is `3000`.

Default production port is `8088`.

These can be changed in constants.js

The scripts are set to compile css next to scss because ngc compiler does not support Sass.
To compile scss, use `npm run sass`, but many of the scripts will either build or watch scss files.

Use `npm start` for dev server;

Use `npm run server:prod` for production server and production watch.

Use `npm run prod:build` for production build.

To update nightly builds (and other applications with ^ in version),
run `npm update`. If a nightly build introduces a breaking change that harms your app, you can roll back
by using the SHA # of a previous working build. Just go to https://github.com/angular?utf8=%E2%9C%93&query=builds
and look up the commit dates before the build that caused you trouble and amend package dependency to
`github:angular/PACKAGE_NAME-builds#SOME_SHA_NUMBER`.

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
