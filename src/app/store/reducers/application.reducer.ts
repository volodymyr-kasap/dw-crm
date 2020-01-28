import {ApplicationAction, ApplicationUnion} from '../actions/application.actions';

export interface State {
  baseUrl: string;
  queryProgressBar: boolean;
}

export const initialState: State = {
  baseUrl: 'http://localhost:3000',
  queryProgressBar: false
};

export function applicationReducer(state: State = initialState, action: ApplicationUnion)  {
  switch (action.type) {
    case ApplicationAction.EditBaseUrl:
      return {
        ...state,
        baseUrl: action.payload
      };
    case ApplicationAction.SetQueryProgressBar:
      return {
        ...state,
        queryProgressBar: action.payload
      };
    default:
      return state;
  }
}
