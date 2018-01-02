import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { TransferHttp } from '../../modules/transfer-http/transfer-http';

import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { User } from '../user/user.model';

import * as UserActions from '../user/user.actions';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  testSub$: Observable<string>;
  user: User;
  user$: Observable<User>;
  constructor(
    private fb: FormBuilder,
    private http: TransferHttp,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      name: ''
    });
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });
  }

  ngOnInit() {
    this.form.get('name').setValue(this.user.name);
    if (UNIVERSAL) {
      this.testSub$ = this.http.get('http://localhost:8000/data').map(data => {
        return `${data.greeting} ${data.name}`;
      });
    }
  }

  clearName() {
    this.store.dispatch(new UserActions.EditUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.form.get('name').setValue('');
  }

  logout() {
    this.store.dispatch(new UserActions.Logout());
  }

  submitState() {
    this.store.dispatch(new UserActions.EditUser(
      Object.assign({}, this.user, { name: this.form.get('name').value }
      )));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}
