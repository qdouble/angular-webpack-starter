<<<<<<< HEAD
export const APP_PROVIDERS = [];
=======
import { UserService } from './user/user.service';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  UserService
];
>>>>>>> e1c17a2... Update to Angular 5 & ngrx 4 (#313)
