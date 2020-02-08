import {IMenuGroup} from '../interfaces/menu-group.interface';

export const SideMenuItems: IMenuGroup[] = [
  {
    title: 'Главное',
    items: [
      {
        name: 'Главная',
        link: '/',
        iconClass: 'fas fa-home',
      },
      {
        name: 'Потенц. клиенты',
        link: '/PotentialClients/List',
        iconClass: 'fas fa-user-clock',
      },
      {
        name: 'Пользователи',
        link: '/Users',
        iconClass: 'fas fa-user-cog',
      }
    ]
  }
];
