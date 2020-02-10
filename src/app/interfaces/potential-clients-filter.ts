import {ISelectedFilter} from './selected-filter.interface';
import {EventsResult} from '../models/events-result.model';
import {WayToAdd} from '../models/way-to-add.model';
import {EventsAction} from '../models/events-action.model';
import {Manager} from '../models/manager.model';
import {Country} from '../models/country.models';
import {CompanyType} from '../models/company-type.model';

export interface IPotentialClientsFilter {
  filterForm: any;
  eventResult: ISelectedFilter<EventsResult>[],
  wayToAddList: ISelectedFilter<WayToAdd>[],
  eventAction: ISelectedFilter<EventsAction>[],
  managersList: ISelectedFilter<Manager>[],
  countriesList: ISelectedFilter<Country>[],
  clientTypeList: ISelectedFilter<CompanyType>[],
  hideInterface: {[key: number]: {show: boolean; name: string}},
  showTestClients: boolean
}
