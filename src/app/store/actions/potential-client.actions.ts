import {Action} from '@ngrx/store';
import {PotentialClient} from '../../models/potential-client.model';

export enum PotentialClientAction {
  SetPotentialList = '[Potential] SetListAction',
  SetCurrentPotentialClient = '[Potential] SetCurrentClient'
}

export class SetPotentialList implements Action {
  readonly type = PotentialClientAction.SetPotentialList;

  constructor(public payload: PotentialClient[]) {}
}

export class SetCurrentPotentialClient implements Action {
  readonly type = PotentialClientAction.SetCurrentPotentialClient;

  constructor(public payload: PotentialClient) {
  }
}

export type PotentialUnion = SetPotentialList | SetCurrentPotentialClient;
