import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from './core/services/local-storage.service';
import {StorageKey} from './shared/storage-keys';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {AuthService} from './services/auth.service';
import {Store} from '@ngrx/store';
import * as indexReducer from './store';
import {SetUserJwtToken} from './store/actions/user.actions';
const jwtHelper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'dw-crm';
  constructor(
    private localStorageService: LocalStorageService,
    private authService: AuthService,
    private router: Router,
    private store: Store<indexReducer.State>
  ) {
  }

  ngOnInit(): void {
    const token = this.localStorageService.get<string>(StorageKey.JWT);

    if(!token) {
      this.router.navigate(['Guest', 'Login']);
      return;
    }

    if(jwtHelper.isTokenExpired(token)) {
      this.localStorageService.remove(StorageKey.JWT);
      this.router.navigate(['Guest', 'Login']);
      return;
    }

    this.store.dispatch(new SetUserJwtToken(token));
    this.authService.getUserInfo();

  }
}
