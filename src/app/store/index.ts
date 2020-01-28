import {ActionReducerMap} from '@ngrx/store';

import * as user from './reducers/user.reducer';
import * as application from './reducers/application.reducer';


export interface State {
  user: user.State;
  application: application.State;
}

export const reducers: ActionReducerMap<State> = {
  application: application.applicationReducer,
  user: user.userReducer
};
