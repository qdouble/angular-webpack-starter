import { UserActions } from './user/user.actions';
import { UserService } from './user/user.service';

export const APP_PROVIDERS = [
  UserActions,
  UserService
];
