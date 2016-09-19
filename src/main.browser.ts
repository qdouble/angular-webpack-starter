import './polyfills.browser';
import './rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

// if (document.readyState === 'complete') {
//   main();
// } else {
//   document.addEventListener('DOMContentLoaded', main);
// }

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
