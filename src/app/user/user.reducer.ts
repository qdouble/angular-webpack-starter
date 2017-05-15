/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { UserActions } from './user.actions';
import { User } from './user.model';

export interface UserState {
  user: User;
  loading: boolean;
  loaded: boolean;
}

export const initialState: UserState = {
  user: { name: 'Angular User' },
  loading: false,
  loaded: true,
};

export function userReducer(state = initialState, action: Action): UserState {
  switch (action.type) {

    case UserActions.EDIT_USER: {
      return {
        ...state,
        user: action.payload
      };
    }

    default: {
      return state;
    }
  }
}
