import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthForm} from '../../interfaces/auth-form';
import {Observable} from 'rxjs';
import {AccessToken} from '../../interfaces/access-token';


@Injectable({ providedIn: 'root' })
export class AuthApi {
  constructor(
    private http: HttpClient,
  ) { }


  login(loginForm: AuthForm): Observable<AccessToken> {
    return this.http.post<AccessToken>('login', loginForm);
  }

  register(registerForm: AuthForm): Observable<AccessToken> {
    return this.http.post<AccessToken>('register', registerForm);
  }


}
