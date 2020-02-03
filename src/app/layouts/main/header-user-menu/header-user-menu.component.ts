import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.models';
import * as indexReducer from 'src/app/store/index';
import {select, Store} from '@ngrx/store';

@Component({
  selector: 'app-header-user-menu',
  templateUrl: './header-user-menu.component.html',
  styleUrls: ['./header-user-menu.component.scss']
})
export class HeaderUserMenuComponent implements OnInit {

  public userInfo$: Observable<User>;

  constructor(
    private store: Store<indexReducer.State>
  ) { }

  ngOnInit() {
    this.userInfo$ = this.store.pipe(select(state => state.user.user));
  }

}
