import {Action} from '@ngrx/store';

export enum ApplicationAction {
  EditBaseUrl = '[App] EditBaseUrl',
  SetQueryProgressBar = '[App] SetQueryProgressBar'
}

export class EditBaseUrl implements Action {
  readonly type = ApplicationAction.EditBaseUrl;

  constructor(public payload: string) {}
}

export class SetQueryProgressBar implements Action {
  readonly type = ApplicationAction.SetQueryProgressBar;

  constructor(public payload: boolean) {}
}

export type ApplicationUnion = EditBaseUrl | SetQueryProgressBar;
