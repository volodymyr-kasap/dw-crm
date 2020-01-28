import {Action} from '@ngrx/store';

export enum ApplicationAction {
  EditBaseUrl = '[App] EditBaseUrl',
  HideQueryProgressBar = '[App] HideQueryProgressBar',
  ShowQueryProgressBar = '[App] ShowQueryProgressBar'
}

export class EditBaseUrl implements Action {
  readonly type = ApplicationAction.EditBaseUrl;

  constructor(public payload: string) {}
}

export class HideQueryProgressBar implements Action {
  readonly type = ApplicationAction.HideQueryProgressBar;
}

export class ShowQueryProgressBar implements Action {
  readonly type = ApplicationAction.ShowQueryProgressBar;
}

export type ApplicationUnion = EditBaseUrl | HideQueryProgressBar | ShowQueryProgressBar;
