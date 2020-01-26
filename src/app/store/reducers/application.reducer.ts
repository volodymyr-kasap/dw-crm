import {ApplicationAction, ApplicationUnion} from '../actions/application.actions';

export interface State  {
  baseUrl: string;
}

export const initialState: State = {
  baseUrl: 'http://localhost:3000'
};

export function applicationReducer(state = initialState, action: ApplicationUnion) {
  switch (action.type) {
    case ApplicationAction.EditBaseUrl:
      return {
        ...state,
        baseUrl: action.payload
      };
    default:
      return state;
  }
}
