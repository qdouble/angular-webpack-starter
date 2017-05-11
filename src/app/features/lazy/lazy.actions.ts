/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { Action } from '@ngrx/store';

@Injectable()

export class LazyActions {

  static DECREMENT = '[Lazy] Decrement';
  decrement(): Action {
    return {
      type: LazyActions.DECREMENT
    };
  }

  static INCREMENT = '[Lazy] Increment';
  increment(): Action {
    return {
      type: LazyActions.INCREMENT
    };
  }

  static RESET = '[Lazy] Reset';
  reset(): Action {
    return {
      type: LazyActions.RESET
    };
  }
}
