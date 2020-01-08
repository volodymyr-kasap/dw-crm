import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import * as indexReducer from '../store';
const jwtHelper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return true;
    // debugger
    // const token = localStorage.getItem('token');
    // if (!jwtHelper.isTokenExpired(token)) {
    //   return true;
    // }
    //
    // this.router.navigate(['/login']);
    // return false;
  }
}
