import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {StorageKey} from '../../../shared/storage-keys';
import {select, Store} from '@ngrx/store';
import * as indexReducer from '../../../store';
import {Observable} from 'rxjs';
import {User} from '../../../models/user.models';
import {IMenuGroup} from '../../../interfaces/menu-group.interface';
import {SideMenuItems} from '../../../shared/side-menu-items';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  public isOpened: boolean = false;
  public isShowTooltip: boolean = true;
  public isFixed: boolean = false;
  public menuWidth: string;

  public userInfo: Observable<User>;

  public menuGroupList: IMenuGroup[] = SideMenuItems;

  public menuSizes = {
    closed: '64px',
    opened: '240px'
  };

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<indexReducer.State>
  ) { }

  ngOnInit() {
    this.initFixation();
    this.userInfo = this.store.pipe(select(state => state.user.user));
  }

  public open() {
    this.isOpened = true;
    this.menuWidth = this.menuSizes.opened;
    this.isShowTooltip = false;
  }

  public close() {
    this.isOpened = false;
    this.menuWidth = this.menuSizes.closed;
    this.isShowTooltip = true;
  }

  public changeMenuFixation() {
    this.isFixed = !this.isFixed;
    this.localStorageService.set(StorageKey.Is_Fixed_Menu, this.isFixed);
    this.isFixed ? this.open() : this.close();
  }

  private initFixation() {
    this.isFixed = this.localStorageService.get<boolean>(StorageKey.Is_Fixed_Menu) || false;
    (this.isFixed) ? this.open() : this.close();
  }

}
