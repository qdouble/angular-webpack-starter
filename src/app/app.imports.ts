import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MdButtonModule } from '@angular2-material/button';
import { MdCardModule } from '@angular2-material/card';
import { MdIconModule } from '@angular2-material/icon';
import { MdInputModule } from '@angular2-material/input';
import { MdListModule } from '@angular2-material/list';
import { MdSidenavModule } from '@angular2-material/sidenav';
import { MdToolbarModule } from '@angular2-material/toolbar';

import { routes } from './app.routing';

export const APP_IMPORTS = [
  MdButtonModule,
  MdCardModule,
  MdIconModule.forRoot(),
  MdInputModule,
  MdListModule,
  MdSidenavModule,
  MdToolbarModule,
  ReactiveFormsModule,
  RouterModule.forRoot(routes)
];
