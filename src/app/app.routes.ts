import { Dashboard } from './features/dashboard';
import { NotFound404Component } from './not-found404.component';
import { Routes } from '@angular/router';

export function loadLazy() {
  return require('es6-promise!./features/lazy')('LazyModule');
}

export const routes: Routes = [
  { path: '', component: Dashboard, pathMatch: 'full' },
  { path: 'lazy', loadChildren: loadLazy },
  { path: '**', component: NotFound404Component }
];
