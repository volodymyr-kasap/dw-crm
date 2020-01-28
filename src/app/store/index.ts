import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';

import * as fromUser from './reducers/user.reducer';
import * as fromApplication from './reducers/application.reducer';


export interface State {
  user: fromUser.State;
  application: fromApplication.State;
}

export const reducers: ActionReducerMap<State> = {
  application: fromApplication.applicationReducer,
  user: fromUser.userReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

