import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthFormInterface} from '../../interfaces/auth-form.interface';
import {Observable} from 'rxjs';
import {AccessTokenInterface} from '../../interfaces/access-token.interface';
import {User} from '../../models/user.models';

@Injectable({
  providedIn: 'root'
})
export class AuthApi {
  constructor(
    private http: HttpClient
  ) { }


  login(loginForm: AuthFormInterface): Observable<AccessTokenInterface> {
    return this.http.post<AccessTokenInterface>('login', loginForm);
  }

  register(registerForm: AuthFormInterface): Observable<AccessTokenInterface> {
    return this.http.post<AccessTokenInterface>('register', registerForm);
  }

  getUser(userId: number) {
    return this.http.get<User>(`users/${userId}`);
  }

}
