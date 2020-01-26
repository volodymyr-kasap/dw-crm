import {Action} from '@ngrx/store';
import {User} from '../../models/user.models';

export enum UserAction {
  GetUserInfo = '[User] GetUserInfo',
  SetUserInfo = '[User] SetUserInfo',
  SetUserJwtToken = '[User] SetUserJwtToken'
}

export class GetUserInfo implements Action {
  readonly type = UserAction.GetUserInfo;
}

export class SetUserInfo implements Action {
  readonly type = UserAction.SetUserInfo;

  constructor(public payload: User) {}
}

export class SetUserJwtToken implements Action {
  readonly type = UserAction.SetUserJwtToken;

  constructor(public payload: string) { }
}

export type UserUnion = GetUserInfo | SetUserInfo | SetUserJwtToken;
