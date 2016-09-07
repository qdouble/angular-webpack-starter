/* tslint:disable: variable-name max-line-length */
import { Dashboard } from './features/dashboard';
import { NotFound404Component } from './not-found404.component';
import { Routes } from '@angular/router';

// Lazy loaded modules are different based on whether in AOT or JIT mode.
// Using a string instead of a function is supposed to let angular do prefixing
// but it doesn't currently work. This is the best workaround for now.

export function loadLazy() {
  if (!AOT) {
    return System.import('./features/lazy')
      .then((r: any) => r.LazyModule);
  } else {
    return System.import('../compiled/app/features/lazy/index.ngfactory.ts')
      .then((r: any) => r.LazyModuleNgFactory);
  }
}

export const routes: Routes = [
  { path: '', component: Dashboard, pathMatch: 'full' },
  { path: 'lazy', loadChildren: loadLazy },
  { path: '**', component: NotFound404Component }
];
