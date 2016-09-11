/* tslint:disable: variable-name max-line-length */
import { Dashboard } from './features/dashboard';
import { NotFound404Component } from './not-found404.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', component: Dashboard, pathMatch: 'full' },
  { path: 'lazy', loadChildren: './features/lazy/index#LazyModule' },
  { path: '**', component: NotFound404Component }
];
