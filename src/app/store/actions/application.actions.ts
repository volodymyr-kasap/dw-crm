import {Action} from '@ngrx/store';

export enum ApplicationAction {
  EditBaseUrl = '[App] EditBaseUrl',

}

export class EditBaseUrl implements Action {
  readonly type = ApplicationAction.EditBaseUrl;

  constructor(public payload: string) {}
}

export type ApplicationUnion = EditBaseUrl;
