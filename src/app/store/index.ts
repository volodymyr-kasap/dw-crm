import {ActionReducer, ActionReducerMap, MetaReducer} from '@ngrx/store';

import * as fromUser from './reducers/user.reducer';
import * as fromApplication from './reducers/application.reducer';
import * as fromPotentialClient from './reducers/potential-client.reducer';
import * as fromPromo from './reducers/promo.reducer';
import * as fromCountry from './reducers/country.reducer';


export interface State {
  user: fromUser.State;
  application: fromApplication.State;
  potential: fromPotentialClient.State;
  promo: fromPromo.State;
  country: fromCountry.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.userReducer,
  application: fromApplication.applicationReducer,
  potential: fromPotentialClient.potentialReducer,
  promo: fromPromo.promoReducer,
  country: fromCountry.countryReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: State, action: any): State => {
    console.log('state', state);
    console.log('action', action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<State>[] = [logger];

