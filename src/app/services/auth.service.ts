import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as indexReducer from '../store/index';
import {SetUserInfo, SetUserJwtToken} from '../store/actions/user.actions';
import {Injectable} from '@angular/core';
import {AuthApi} from '../core/api/auth.api';
import {forkJoin} from 'rxjs';
import {MainApi} from '../core/api/main.api';
import {JwtHelperService} from '@auth0/angular-jwt';
import {LoadPromos} from '../store/actions/promo.actions';
import {LoadCountries} from '../store/actions/country.actions';
import {IAuthForm} from '../interfaces/auth-form.interface';
import {IAccessToken} from '../interfaces/access-token.interface';
const jwtHelper = new JwtHelperService();


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private authApi: AuthApi,
    private mainApi: MainApi,
    private store: Store<indexReducer.State>
  ) { }


  public makeLogin(loginForm: IAuthForm) {
    this.authApi.login(loginForm)
      .subscribe((res: IAccessToken) => {
        if (res) {
          this.store.dispatch(new SetUserJwtToken(res.accessToken));
          this.getUserInfo();
          this.router.navigate(['/']);
        }
      });
  }

  public makeRegister(registerForm: IAuthForm) {
    this.authApi.register(registerForm)
      .subscribe((res: IAccessToken) => {
        if (res) {
          this.store.dispatch(new SetUserJwtToken(res.accessToken));
          this.getUserInfo();
          this.router.navigate(['/']);
        }
      });
  }

  public getUserInfo() {
    this.store.select(state => state.user.token).subscribe(token => {
      const info = jwtHelper.decodeToken(token);
      forkJoin(
        this.authApi.getUser(info.sub),
        this.mainApi.getPromo(),
        this.mainApi.getCountries(),
      ).subscribe(([user, promos, countries]) => {
        if (user) {
          this.store.dispatch(new SetUserInfo(user));
        }
        if (promos) {
          this.store.dispatch(new LoadPromos(promos));
        }
        if (countries) {
          this.store.dispatch(new LoadCountries(countries));
        }
      });
    });
  }

}
