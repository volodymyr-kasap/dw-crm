import {Country} from '../../models/country.models';
import {CountryAction, CountryUnion} from '../actions/country.actions';

export interface State  {
  countryList: Country[];
}

export const initialState: State = {
  countryList: null
};

export function countryReducer(state: State = initialState, action: CountryUnion)  {
  switch (action.type) {
    case CountryAction.LoadCountries:
      return {
        ...state,
        countryList: action.payload
      };
    default:
      return state;
  }
}
