import {ApplicationAction, ApplicationUnion} from '../actions/application.actions';

export interface State {
  baseUrl: string;
  showQueryProgressBar: boolean;
}

export const initialState: State = {
  baseUrl: 'http://localhost:3000',
  showQueryProgressBar: false
};

export function applicationReducer(state: State = initialState, action: ApplicationUnion) {
  switch (action.type) {
    case ApplicationAction.EditBaseUrl:
      return {
        ...state,
        baseUrl: action.payload
      };
    case ApplicationAction.HideQueryProgressBar:
      return {
        ...state,
        showQueryProgressBar: false
      };
    case ApplicationAction.ShowQueryProgressBar:
      return {
        ...state,
        showQueryProgressBar: true
      };
    default:
      return state;
  }
}

