import {PromoItem} from '../../models/promo.model';
import {PromoAction, PromoUnion} from '../actions/promo.actions';

export interface State  {
  promoList: PromoItem[];
}

export const initialState: State = {
  promoList: null
};

export function promoReducer(state: State = initialState, action: PromoUnion)  {
  switch (action.type) {
    case PromoAction.LoadPromos:
      return {
        ...state,
        promoList: action.payload
      };
    default:
      return state;
  }
}
