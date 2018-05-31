import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

import * as fromRoot from './reducers';

@Component({
  selector: 'my-app',
  styleUrls: ['main.scss', './app.component.scss'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public store: Store<fromRoot.AppState>
  ) { }

  activateEvent(event) {
    if (ENV === 'development') {
      console.log('Activate Event:', event);
    }
  }

  deactivateEvent(event) {
    if (ENV === 'development') {
      console.log('Deactivate Event', event);
    }
  }
}
