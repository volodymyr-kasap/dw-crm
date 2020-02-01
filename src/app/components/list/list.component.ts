import {Component, Input, OnInit} from '@angular/core';
import {IMenuItem} from '../../interfaces/menu-item.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input() listItems: IMenuItem[];
  @Input() showTooltip: boolean = false;
  @Input() isOpened: boolean = true;
  @Input() activeLinkClass: string = '';
  @Input() itemClass: string = '';
  @Input() iconClass: string = '';
  @Input() textClass: string = '';

  constructor() { }

  ngOnInit() {
  }

}
