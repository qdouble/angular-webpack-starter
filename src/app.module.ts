/** 
 * This module is the entry for your App when NOT using universal.
 * 
 * Make sure to use the 3 constant APP_ imports so you don't have to keep
 * track of your root app dependencies here. Only import directly in this file if
 * there is something that is specific to the environment.  
 */

import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { APP_DECLERATIONS } from './app/app.declerations';
import { APP_IMPORTS } from './app/app.imports';
import { APP_PROVIDERS } from './app/app.providers';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routing';

@NgModule({
  declarations: [
    AppComponent,
    APP_DECLERATIONS
  ],
  imports: [
    APP_IMPORTS,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent],
  providers: [APP_PROVIDERS]
})
export class AppModule { }
