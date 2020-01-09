import {ActionReducerMap, createFeatureSelector, createSelector} from '@ngrx/store';

import * as user from './reducers/user.reducer';
import * as application from './reducers/application.reducer';

export interface State {
  user: user.State;
  application: application.State;
}

export const reducers: ActionReducerMap<State> = {
  user: user.userReducer,
  application: application.applicationReducer
};
