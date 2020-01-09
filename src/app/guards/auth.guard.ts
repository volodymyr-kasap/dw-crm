import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Store} from '@ngrx/store';
import * as indexReducer from '../store';
import {decode} from 'punycode';
const jwtHelper = new JwtHelperService();


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return !jwtHelper.isTokenExpired(token);
    } else {
      this.router.navigate(['Guest', 'Login']);
      return false;
    }
  }
}
