import { AfterContentInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular2-material/sidenav';

import { views } from './app-nav.views';

import { MOBILE } from './services/constants';

@Component({
  selector: 'app',
  styleUrls: ['./app.css'],
  templateUrl: './app.html',
  encapsulation: ViewEncapsulation.None
})
export class App implements AfterContentInit {
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngAfterContentInit() {
    if (!MOBILE) {
      setTimeout(() => {
        this.sidenav.open();
      }, 250);
    }
  }

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
