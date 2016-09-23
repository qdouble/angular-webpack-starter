import './polyfills.browser';
import './rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';
import { AppModule } from './app/app.module.universal.browser';

if ('production' === ENV) {
  enableProdMode();
}

export function main() {
  return platformUniversalDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
