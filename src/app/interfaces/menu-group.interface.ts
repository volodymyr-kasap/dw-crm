import {IMenuItem} from './menu-item.interface';

export interface IMenuGroup {
  title?: string;
  items: IMenuItem[];
  separateLine?: boolean;
}
