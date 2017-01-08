import './polyfills.browser.aot';
import './rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformUniversalDynamic } from 'angular2-universal';
import { AppModuleNgFactory } from '../compiled/src/app/app.module.universal.browser.ngfactory';

if ('production' === ENV) {
  enableProdMode();
}

export const platform = platformUniversalDynamic();

export function main() {
  return platform.bootstrapModuleFactory(AppModuleNgFactory)
    .catch(err => console.log(err));
}

export function bootstrapDomReady() {
  document.addEventListener('DOMContentLoaded', main);
}

bootstrapDomReady();
