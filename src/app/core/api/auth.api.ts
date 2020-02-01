import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user.models';
import {IAccessToken} from '../../interfaces/access-token.interface';
import {IAuthForm} from '../../interfaces/auth-form.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  constructor(
    private http: HttpClient
  ) { }


  login(loginForm: IAuthForm): Observable<IAccessToken> {
    return this.http.post<IAccessToken>('login', loginForm);
  }

  register(registerForm: IAuthForm): Observable<IAccessToken> {
    return this.http.post<IAccessToken>('register', registerForm);
  }

  getUser(userId: number) {
    return this.http.get<User>(`users/${userId}`);
  }

}
