import {Action} from '@ngrx/store';
import {User} from '../models/user.models';

export enum UserAction {
  GetUserInfo = '[User Info] GetUserInfo',
  SetUserInfo = '[User Info] SetUserInfo'
}

export class GetUserInfo implements Action {
  readonly type = UserAction.GetUserInfo;
}

export class SetUserInfo implements Action {
  readonly type = UserAction.SetUserInfo;

  constructor(public payload: User) {}
}

export type UserUnion = GetUserInfo | SetUserInfo;
