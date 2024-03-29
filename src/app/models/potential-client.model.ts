import {Contact} from './contact.model';
import {PotClientEvent} from './potential-client-event.model';
import {CompanyType} from './company-type.model';
import {WayToAdd} from './way-to-add.model';
import {Manager} from './manager.model';

export class PotentialClient {
  constructor(
    public id: number,
    public name: string,
    public type: CompanyType | number,
    public countryName: string,
    public countryCode: string,
    public companyName: string,
    public lastChangeDate: Date,
    public additionDate: Date,
    public isDemo: boolean,
    public managers: Manager[] | Partial<Manager>[],
    public contacts: Contact,
    public lastEvent: PotClientEvent,
    public wayToAdd: WayToAdd | number
    ) {
  }
}

