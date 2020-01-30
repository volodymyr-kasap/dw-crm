import {Injectable} from '@angular/core';
import {LocalStorageService} from './local-storage.service';
import {StorageKey} from '../../shared/storage-keys';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import * as indexReducer from '../../store';
import {SetUserJwtToken} from '../../store/actions/user.actions';

const jwtHelper = new JwtHelperService();

@Injectable()
export class AppInitService {
  constructor (
    //private authService: AuthService,
    // private storageService: LocalStorageService,
    // private store: Store<indexReducer.State>
  ) {
  }

  public init () {
    if (!jwtHelper.isTokenExpired('token')) {
      //this.store.dispatch(new SetUserJwtToken(token));
      //this.authService.getUserInfo();
    } else {
      //this.storageService.remove(StorageKey.JWT)
    }

  }
}
