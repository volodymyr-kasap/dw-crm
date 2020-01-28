import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as indexReducer from '../../store';
import {Observable, throwError} from 'rxjs';
import {catchError, finalize} from 'rxjs/operators';
import {SetQueryProgressBar} from '../../store/actions/application.actions';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<indexReducer.State>
  ) {}

  static errorHandler(error: HttpErrorResponse) {
    console.log(error);
    return throwError(error);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.store.dispatch(new SetQueryProgressBar(true));
    let baseUrl = '';
    let token = '';
    this.store.select(state => state.application.baseUrl).subscribe(state => {
      baseUrl = state;
    });
    this.store.select(state => state.user.token).subscribe(state => {
      if (state) {
        token = state;
      }
    });

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('authorization', 'Bearer ' + token);
    }

    const newReq = req.clone({url: `${baseUrl}/${req.url}`, headers});

    return next.handle(newReq)
      .pipe(
        catchError(error => RequestInterceptor.errorHandler(error)),
        finalize(() => this.store.dispatch(new SetQueryProgressBar(false)))
      );
  }
}
