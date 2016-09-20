import { compose } from '@ngrx/core/compose';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { routerReducer, RouterState } from '@ngrx/router-store';

import { userReducer, UserState } from '../user/user.reducer';

export interface AppState {
  router: RouterState;
  user: UserState;
}

export const reducers = {
  router: routerReducer,
  user: userReducer
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action ) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

const developmentReducer = compose(stateSetter, storeFreeze, combineReducers)(reducers);
const productionReducer = combineReducers(reducers);

export function rootReducer(state: any, action: any) {
  if (ENV !== 'development') {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}
