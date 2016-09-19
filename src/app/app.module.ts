/** 
 * This module is the entry for your App when NOT using universal.
 * 
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.  
 */

import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

import { APP_DECLERATIONS } from './app.declerations';
import { APP_IMPORTS } from './app.imports';
import { APP_PROVIDERS } from './app.providers';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLERATIONS
  ],
  imports: [
    APP_IMPORTS,
    BrowserModule,
    HttpModule,
  ],
  bootstrap: [AppComponent],
  providers: [APP_PROVIDERS]
})

export class AppModule {
  constructor(public appRef: ApplicationRef) {}
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
