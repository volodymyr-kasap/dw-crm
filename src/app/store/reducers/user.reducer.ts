import {UserAction, UserUnion} from '../actions/user.actions';
import {User} from '../../models/user.models';

export interface State  {
  user: User;
  token: string;
}

export const initialState: State = {
  user: new User(),
  token: null,
};

export function userReducer(state: State = initialState, action: UserUnion) {
  switch (action.type) {
    case UserAction.SetUserInfo:
      return {
        ...state,
        user: action.payload
      };
    case UserAction.SetUserJwtToken:
      return {
        ...state,
        token: action.payload
      }
    default:
      return state;
  }
}
