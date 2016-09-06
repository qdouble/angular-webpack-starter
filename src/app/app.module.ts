import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { App } from './app';
import { Dashboard } from './features/dashboard';
import { NotFound404Component } from './not-found404.component';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    App,
    Dashboard,
    NotFound404Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdCardModule,
    MdIconModule.forRoot(),
    MdInputModule,
    MdListModule,
    MdSidenavModule,
    MdToolbarModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [App],
  providers: []
})
export class AppModule { }
