import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { routes } from './app.routing';

export const APP_IMPORTS = [
  ReactiveFormsModule,
  RouterModule.forRoot(routes)
];

