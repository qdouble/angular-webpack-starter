# Starter App for Angular 2 using Nightly Builds, Material Design and Webpack 2
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
  * AOT Compilation
  * AOT safe SASS compilation

Default dev port is `3000`.

Default production port is `8088`.

These can be changed in constants.js

The scripts are set to compile css next to scss because ngc compiler does not support Sass.

Use `npm start` for dev server;

Use `npm run server:prod` for production server and production watch.

Use `npm run prod:build` for production build.

To create AOT version, run `npm run compile`. This will compile and build script.
Then you can use `npm run prodserver` to see to serve files;

There is a known bug of AOT not properly loading the routing configuration of lazy loaded modules
https://github.com/angular/angular/issues/11075


