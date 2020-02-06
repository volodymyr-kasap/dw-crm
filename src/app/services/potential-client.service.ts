import {Store} from '@ngrx/store';
import * as indexReducer from '../store/index';
import {Injectable} from '@angular/core';
import {PotentialClientApi} from '../core/api/potential-client.api';
import {SetPotentialList} from '../store/actions/potential-client.actions';
import {CompanyTypesEnum} from '../shared/company-types-enum';
import {CompanyType} from '../models/company-type.model';
import {WayToAdd} from '../models/way-to-add.model';
import {forkJoin} from 'rxjs';


@Injectable()
export class PotentialClientService {

  private companyTypes: CompanyType[];
  private wayToAdd: WayToAdd[];

  constructor(
    private store: Store<indexReducer.State>,
    private potentialClientsApi: PotentialClientApi) {
    this.store.select(select => select.potential.companyTypes)
      .subscribe(res => this.companyTypes = res);
    this.store.select(select => select.potential.wayToAddList)
      .subscribe(res => this.wayToAdd = res);
  }

  public getPotentialClients() {
    forkJoin(
      this.potentialClientsApi.getPotentialClients(),
      this.potentialClientsApi.getManagers()
    ).subscribe(([potClients, managers]) => {
        if (potClients && managers) {
          potClients.forEach(client => {
            if (client.type !== null) {
              client.type = this.companyTypes.find(x => x.id === client.type);
            }
            if (client.wayToAdd !== null) {
              client.wayToAdd = this.wayToAdd.find(x => x.id === client.wayToAdd);
            }
            if (client.managers && client.managers.length > 0) {
              for (let i = 0; i < client.managers.length; i++) {
                client.managers[i] = managers.find(x => x.id === client.managers[i].id);
              }
            }

          });

          this.store.dispatch(new SetPotentialList(potClients));
        }
      });
  }



}
