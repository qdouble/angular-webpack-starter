import { AppState } from './../../reducers/index';

import { LazyActions, LazyActionTypes } from './lazy.actions';
import * as fromRoot from '../../reducers';

export interface LazyState {
    counter: number;
}

const initialState: LazyState = {
    counter: 0
};

export interface State extends fromRoot.AppState {
    lazyModule: { lazy: LazyState };
}

export function lazyReducer(state: LazyState = initialState, action: LazyActions) {
    switch (action.type) {

        case LazyActionTypes.Decrement:
            return {
                ...state,
                counter: state.counter - 1
            };


        case LazyActionTypes.Increment:
            return {
                ...state,
                counter: state.counter + 1
            };


        case LazyActionTypes.Reset:
            return {
                ...state,
                counter: 0
            };

        default:
            return state;
    }
}

