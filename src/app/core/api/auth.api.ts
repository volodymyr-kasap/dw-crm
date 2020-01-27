import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthForm} from '../../interfaces/auth-form';
import {Observable} from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthApi {
  constructor(
    private http: HttpClient,
  ) { }


  login(loginForm: AuthForm): Observable<string> {
    return this.http.post<string>('login', loginForm);
  }

  register(registerForm: AuthForm): Observable<string> {
    return this.http.post<string>('register', registerForm);
  }


}
