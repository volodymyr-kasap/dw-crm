import {Store} from '@ngrx/store';
import * as indexReducer from '../store/index';
import {Injectable} from '@angular/core';
import {EventsAction} from '../models/events-action.model';
import {EventsResult} from '../models/events-result.model';
import {WayToAdd} from '../models/way-to-add.model';
import {PotentialClientApi} from '../core/api/potential-client.api';
import {SetPotentialList} from '../store/actions/potential-client.actions';

@Injectable()
export class PotentialClientService {

  eventsActionList: EventsAction[] = null;
  eventResultList: EventsResult[] = null;
  wayToAddList: WayToAdd[] = null;
  companyTypesList: string[] = null;

  constructor(
    private store: Store<indexReducer.State>,
    private potentialClientsApi: PotentialClientApi
  ) {
    this.store.select(state => state.potential.eventResultList)
      .subscribe(eventResult => {
        this.eventResultList = eventResult;
      });
    this.store.select(state => state.potential.wayToAddList)
      .subscribe(wayToAdd => {
        this.wayToAddList = wayToAdd;
      });
    this.store.select(state => state.potential.eventsActionList)
      .subscribe(wayToAdd => {
        this.eventsActionList = wayToAdd;
      });
    this.store.select(state => state.potential.companyTypes)
      .subscribe(types => {
        this.companyTypesList = types;
      })


  }

  public getPotentialClients() {
    this.potentialClientsApi.getPotentialClients()
      .subscribe((potClients) => {
        if (potClients) {
          this.store.dispatch(new SetPotentialList(potClients));
        }
      })

  }



}
