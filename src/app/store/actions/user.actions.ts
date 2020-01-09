import {Action} from '@ngrx/store';
import {User} from '../../models/user.models';
import {JwtToken} from '../../interfaces/jwt-token';

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

  constructor(public payload: JwtToken) { }
}

export type UserUnion = GetUserInfo | SetUserInfo | SetUserJwtToken;
