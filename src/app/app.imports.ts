import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { StoreDevToolsModule } from './features/store-devtools.module';
import { UserEffects } from './user/user.effects';

export const APP_IMPORTS = [
  EffectsModule.run(UserEffects),
  // MdButtonModule,
  MdCardModule,
  MdIconModule.forRoot(),
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  ReactiveFormsModule,
  RouterModule.forRoot(routes),
  StoreDevToolsModule,
  StoreModule.provideStore(rootReducer)
];

/**
 * Currently MdButtonModule stops HMR from working properly 
 * if it is imported on initial load. If you uncomment it after initial
 * load the page will refresh and MdButton will be fine.
 * If you find a better solution, please submit a PR or file an issue.
 */
if (!HMR) {
  APP_IMPORTS.push(MdButtonModule);
}

