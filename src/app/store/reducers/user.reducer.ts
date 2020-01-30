import {UserAction, UserUnion} from '../actions/user.actions';
import {User} from '../../models/user.models';
import {LocalStorageService} from '../../core/services/local-storage.service';
import {StorageKey} from '../../shared/storage-keys';
const localStorageService = new LocalStorageService();

export interface State  {
  user: User;
  token: string;
}

export const initialState: State = {
  user: null,
  token: null,
};

export function userReducer(state: State = initialState, action: UserUnion)  {
  switch (action.type) {
    case UserAction.SetUserInfo:
      return {
        ...state,
        user: action.payload
      };
    case UserAction.SetUserJwtToken:
      localStorageService.set(StorageKey.JWT, action.payload);
      return {
        ...state,
        token: action.payload
      };
    default:
      return state;
  }
}
