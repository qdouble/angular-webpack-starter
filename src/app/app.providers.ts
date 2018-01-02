import { UserService } from './user/user.service';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  UserService
];
