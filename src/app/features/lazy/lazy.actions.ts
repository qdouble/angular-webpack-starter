import { Response } from '@angular/http';
import { Action } from '@ngrx/store';
import { Logout, LogoutSuccess } from '../../user/user.actions';

export enum LazyActionTypes {
  Decrement = '[Lazy] Decrement',
  Increment = '[Lazy] Increment',
  Reset = '[Lazy] Reset'
}

export class Decrement implements Action {
  readonly type = LazyActionTypes.Decrement;
}

export class Increment implements Action {
  readonly type = LazyActionTypes.Increment;
}

export class Reset implements Action {
  readonly type = LazyActionTypes.Reset;
}

export type LazyActions =
  | Decrement
  | Increment
  | Reset;
