import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import * as indexReducer from '../../store';
const jwtHelper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<indexReducer.State>
  ) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let token = '';
    this.store.select(state => state.user.token).subscribe(tkn => {
      token = tkn;
    });
    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else {
      this.router.navigate(['Guest', 'Login']);
      return false;
    }
  }
}
