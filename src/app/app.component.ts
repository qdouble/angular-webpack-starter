import { AfterContentInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MdSidenav } from '@angular2-material/sidenav';

import { views } from './app-nav-views';
import { MOBILE } from './services/constants';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterContentInit {
  devMode = (ENV === 'development');
  mobile = MOBILE;
  sideNavMode = MOBILE ? 'over' : 'side';
  views = views;
  @ViewChild(MdSidenav) sidenav: MdSidenav;

  constructor(
    public route: ActivatedRoute,
    public router: Router
  ) { }

  ngAfterContentInit() {
    if (HMR) {
      this.sidenav.open();
    } else if (!MOBILE) {
      setTimeout(() => {
        this.sidenav.open();
      });
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
