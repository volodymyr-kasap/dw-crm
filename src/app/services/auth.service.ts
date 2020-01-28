import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import * as indexReducer from '../store/index';
import {AuthForm} from '../interfaces/auth-form';
import {SetUserJwtToken} from '../store/actions/user.actions';
import {Injectable} from '@angular/core';
import {AuthApi} from '../core/api/auth.api';
import {AccessToken} from '../interfaces/access-token';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private authApi: AuthApi,
    private store: Store<indexReducer.State>
  ) { }


  public makeLogin(loginForm: AuthForm) {
    this.authApi.login(loginForm)
      .subscribe((res: AccessToken) => {
        if (res) {
          this.store.dispatch(new SetUserJwtToken(res.accessToken));
          this.router.navigate(['/']);
        }
      });
  }

  public makeRegister(registerForm: AuthForm) {
    this.authApi.register(registerForm)
      .subscribe((res: AccessToken) => {
        if (res) {
          this.store.dispatch(new SetUserJwtToken(res.accessToken));
          this.router.navigate(['/']);
        }
      });
  }

}
