import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class AuthenticationApiService {
  constructor(
    private http: HttpClient,
  ) { }


  login(loginForm: any) {
    let params = new HttpParams();
    params = params.append('login', loginForm.login);
    params = params.append('password', loginForm.password);
    return this.http.post<any>('Account/Authorize', params);
  }


  getUser() {
    return this.http.get<any>(`Account/GetUserInfo`);
  }

}
