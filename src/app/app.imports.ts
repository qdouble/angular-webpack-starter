import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';

import { MaterialModule } from './material.module';
import { TransferHttpModule } from '../modules/transfer-http/transfer-http.module';

import { DEV_REDUCERS, syncReducers, resetOnLogout, AppState } from './reducers';
import { RouterEffects } from './effects/router';
import { UserEffects } from './user/user.effects';

export const metaReducers: MetaReducer<AppState>[] = ENV === 'development' ?
  [...DEV_REDUCERS, resetOnLogout] : [resetOnLogout];

export const APP_IMPORTS = [
  EffectsModule.forRoot([
    RouterEffects,
    UserEffects
  ]),
  MaterialModule,
  ReactiveFormsModule,
  StoreModule.forRoot(syncReducers, { metaReducers }),
  StoreRouterConnectingModule.forRoot({
    stateKey: 'router' // name of reducer key
  }),
  TransferHttpModule
];
