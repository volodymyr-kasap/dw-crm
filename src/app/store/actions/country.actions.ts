import {Action} from '@ngrx/store';
import {Country} from '../../models/country.models';

export enum CountryAction {
  LoadCountries = '[Promo] LoadPromos',
}

export class LoadCountries implements Action {
  readonly type = CountryAction.LoadCountries;

  constructor(public payload: Country[]) {}
}

export type CountryUnion = LoadCountries;
