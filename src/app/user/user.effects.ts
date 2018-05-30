/* tslint:disable: member-ordering */
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { switchMap, mergeMap, catchError } from 'rxjs/operators';

import {
  LogoutFail,
  LogoutSuccess,
  UserActionTypes
} from './user.actions';
import { AppState } from '../reducers';
import { UserService } from './user.service';

@Injectable()

export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService
  ) { }

  @Effect() logout$ = this.actions$.pipe(
    ofType(UserActionTypes.Logout),
    // .map((action: Logout) => action.payload)
    switchMap(() => this.userService.logout()
    .pipe(
      mergeMap((res) => of(
        new LogoutSuccess(res)
      )
      ),
      catchError((err) => of(
        new LogoutFail(err)
      ))
    )));
}
