// export class User {
//   CurrentRole: number;
//   Email: string;
//   Id: number;
//   IsActive: boolean;
//   Login: string;
//   ManagerWorkload: number;
//   Name: string;
//   Permissions: number[];
//   Phone: string;
//   Photo: string;
//   Roles: number[];
//   TelegramUserName: string;
//   Type: number;
//   WorkGroups: number[];
// }

export class User {
  constructor(public id: number,
              public email: string) {}
}

