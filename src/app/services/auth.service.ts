import {Store} from '@ngrx/store';
import {Router} from '@angular/router';
import {HttpClient, HttpParams} from '@angular/common/http';
import * as indexReducer from '../store/index';
import {AuthForm} from '../interfaces/auth-form';
import {JwtToken} from '../interfaces/jwt-token';
import {SetUserInfo, SetUserJwtToken} from '../store/actions/user.actions';
import {User} from '../models/user.models';
import {Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private store: Store<indexReducer.State>
  ) { }


  public makeLogin(loginForm: AuthForm) {
    let params = new HttpParams();
    Object.keys(loginForm).forEach(key => {
      params = params.append(key, loginForm[key]);
    });
    console.log(params);
    this.http.post<JwtToken>('Account/Authorize', params)
      .subscribe(jwt => {
        if (jwt) {
          console.log(jwt);
          this.store.dispatch(new SetUserJwtToken(jwt));
          this.getUser();
          this.router.navigate(['/']);
        }
      },
      error => {
        console.log(error);
      } );
  }

  getUser() {
    this.http.get<User>(`Account/GetUserInfo`)
      .subscribe(user => {
        if (user) {
          this.store.dispatch(new SetUserInfo(user));
        }
      });
  }

}
