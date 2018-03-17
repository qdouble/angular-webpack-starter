import { UserService } from './user/user.service';
import { RouterStateSerializer } from '@ngrx/router-store';
import { CustomSerializer } from './reducers/index';
import { TransferState } from '@angular/platform-browser';

export const APP_PROVIDERS = [
  { provide: RouterStateSerializer, useClass: CustomSerializer },
  UserService,
  TransferState
];
