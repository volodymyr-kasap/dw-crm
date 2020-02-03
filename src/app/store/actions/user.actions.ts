import {Action} from '@ngrx/store';
import {User} from '../../models/user.models';

export enum UserAction {
  SetUserInfo = '[User] SetUserInfo',
  SetUserJwtToken = '[User] SetUserJwtToken',
  DeleteUserJwtToken = '[User] DeleteUserJwtToken'
}

export class SetUserInfo implements Action {
  readonly type = UserAction.SetUserInfo;

  constructor(public payload: User) {}
}

export class SetUserJwtToken implements Action {
  readonly type = UserAction.SetUserJwtToken;

  constructor(public payload: string) { }
}

export class DeleteUserJwtToken implements Action {
  readonly type = UserAction.DeleteUserJwtToken;
}

export type UserUnion =  SetUserInfo | SetUserJwtToken | DeleteUserJwtToken;
