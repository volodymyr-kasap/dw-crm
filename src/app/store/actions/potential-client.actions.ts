import {Action} from '@ngrx/store';
import {PotentialClient} from '../../models/potential-client.model';
import {Manager} from '../../models/manager.model';

export enum PotentialClientAction {
  SetPotentialList = '[Potential] SetListAction',
  SetCurrentPotentialClient = '[Potential] SetCurrentClient',
  SetPotentialManagers = '[Potential] SerPotentialManagers'
}

export class SetPotentialList implements Action {
  readonly type = PotentialClientAction.SetPotentialList;

  constructor(public payload: PotentialClient[]) {}
}

export class SetPotentialManagers implements Action {
  readonly type = PotentialClientAction.SetPotentialManagers;

  constructor(public payload: Manager[]) {}
}

export class SetCurrentPotentialClient implements Action {
  readonly type = PotentialClientAction.SetCurrentPotentialClient;

  constructor(public payload: PotentialClient) {
  }
}

export type PotentialUnion = SetPotentialList | SetCurrentPotentialClient | SetPotentialManagers;
