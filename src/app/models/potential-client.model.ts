import {Contact} from './contact.model';
import {PotClientEvent} from './potential-client-event.model';

export class PotentialClient {
  constructor(
    public id: number,
    public name: string,
    public type: number,
    public countryName: string,
    public countryCode: string,
    public companyName: string,
    public lastChangeDate: Date,
    public additionDate: Date,
    public isDemo: boolean,
    public managers: number[],
    public contact: Contact,
    public lastEvent: PotClientEvent
    ) {
  }
}

