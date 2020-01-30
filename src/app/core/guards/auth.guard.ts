import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import * as indexReducer from '../../store';
import {LocalStorageService} from '../services/local-storage.service';
import {StorageKey} from '../../shared/storage-keys';

const jwtHelper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<indexReducer.State>,
    private localStorageService: LocalStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = this.localStorageService.get<string>(StorageKey.JWT);
    // TODO: refresh token in local storage -> get jwt
    // this.store.select(state => state.user.token).subscribe(tkn => {
    //   token = tkn;
    // });

    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else {
      this.router.navigate(['Guest', 'Login']);
      return false;
    }
  }
}
