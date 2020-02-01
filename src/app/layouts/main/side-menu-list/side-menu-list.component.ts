import {Component, Input, OnInit} from '@angular/core';
import {IMenuGroup} from '../../../interfaces/menu-group.interface';

@Component({
  selector: 'app-side-menu-list',
  templateUrl: './side-menu-list.component.html',
  styleUrls: ['./side-menu-list.component.scss']
})
export class SideMenuListComponent implements OnInit {

  @Input() isOpened: boolean = false;
  @Input() menuItemsList: IMenuGroup;
  @Input() showTooltip: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
