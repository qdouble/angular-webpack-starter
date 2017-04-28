import './polyfills.browser';
import './rxjs.imports';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { bootloader } from '@angularclass/hmr';
import { BrowserAppModule } from './app/browser.app.module';
import { decorateModuleRef } from './environment';

if ('production' === ENV) {
  enableProdMode();
}

export function main(): Promise<any> {
  return platformBrowserDynamic()
    .bootstrapModule(BrowserAppModule)
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
