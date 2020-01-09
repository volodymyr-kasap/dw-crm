import {Injectable} from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as indexReducer from '../store';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<indexReducer.State>
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let baseUrl = '';
    let token = '';
    this.store.select(state => state.application.baseUrl).subscribe(state => {
      baseUrl = state;
    });
    this.store.select(state => state.user.token.jwtToken).subscribe(state => {
      if (state) {
        token = state;
      }
    });

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', 'Bearer ' + token);
    }

    const newReq = req.clone({url: `${baseUrl}/api/${req.url}`, headers});

    return next.handle(newReq);
  }
}
