import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import * as indexReducer from '../../../store/index';
import {select, Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ISelectedFilter} from '../../../interfaces/selected-filter.interface';
import {PotentialClientService} from '../../../services/potential-client.service';
import {Observable, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {PotentialClient} from '../../../models/potential-client.model';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {Manager} from '../../../models/manager.model';
import {Country} from '../../../models/country.models';
import {EventsAction} from '../../../models/events-action.model';
import {EventsResult} from '../../../models/events-result.model';
import {WayToAdd} from '../../../models/way-to-add.model';
import {CompanyType} from '../../../models/company-type.model';
import {LocalStorageService} from '../../../core/services/local-storage.service';
import {StorageKey} from '../../../shared/storage-keys';
import {IPotentialClientsFilter} from '../../../interfaces/potential-clients-filter';

@Component({
  selector: 'app-potential-list',
  templateUrl: './potential-list.component.html',
  styleUrls: ['./potential-list.component.scss']
})
export class PotentialListComponent implements OnInit, OnDestroy {

  @ViewChild('paginator') paginator: MatPaginator;

  potentialClients: PotentialClient[] = null;
  potentialClientsCount$: Observable<number>;

  /* filter */
  subscription = new Subscription();
  filterForm: FormGroup;
  managersList: ISelectedFilter<Manager>[] = [];
  countriesList: ISelectedFilter<Country>[] = [];
  clientTypeList: ISelectedFilter<CompanyType>[] = [];
  eventAction: ISelectedFilter<EventsAction>[]  = [];
  eventResult: ISelectedFilter<EventsResult>[] = [];
  wayToAddList: ISelectedFilter<WayToAdd>[] = [];
  showTestClients = false;
  /* END filter */

  pageEvent: PageEvent = new PageEvent();
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(
    private store: Store<indexReducer.State>,
    private potentialClientService: PotentialClientService,
    private fb: FormBuilder,
    private localStorageService: LocalStorageService
  ) {
    this.filterForm = this.fb.group({
      Filter: new FormControl(''),
      EventDate: new FormControl(null),
      AddingDate: new FormControl(null),
      CallDate: new FormControl(null)
    });
  }

  ngOnInit() {
    this.potentialClientService.getPotentialClients();
    this.initEventPage();
    this.subscription.add(
      this.filterForm.valueChanges.pipe(debounceTime(500)).subscribe(() => this.filterPotentialClients())
    );
    const store$ =  this.store.select(state => state)
      .subscribe(state => {
        if (state.potential.clientList && state.potential.managersList) {
          this.countriesList = state.country.countryList.map( x => ({selected: false, body: x }));
          this.wayToAddList = state.potential.wayToAddList.map( x => ({selected: false, body: x }));
          this.managersList = state.potential.managersList.map( x => ({selected: false, body: x }));
          this.eventAction = state.potential.eventsActionList.map( x => ({selected: false, body: x }));
          this.eventResult = state.potential.eventResultList.map( x => ({selected: false, body: x }));
          this.clientTypeList = state.potential.companyTypesList.map( x => ({selected: false, body: x }));
          this.initFromLocalStorage();
          this.filterPotentialClients();
          this.potentialClientsCount$ = this.store.pipe(select(state => state.potential.clientsCount));
        }
    });

    this.subscription.add(store$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  /* filter */
  filterPotentialClients() {
    this.store.select(state => state.potential.clientList)
      .subscribe(clients => {
        if (clients) {
          this.potentialClients = clients.sort((x , y) => {
            return new Date(y.additionDate).getTime() - new Date(x.additionDate).getTime();
          });
        }
      });

    let filterValue = this.filterForm.value;
    if (filterValue.Filter) {
      this.potentialClients = this.potentialClients.filter(potClient => {
        const searchString = filterValue.Filter.trim().toLocaleLowerCase();
        const textBlock = document.createElement('div');
        if (potClient.lastEvent && potClient.lastEvent.comment) {
          textBlock.innerHTML = potClient.lastEvent.comment;
        }

        return (potClient.id ? potClient.id.toString().includes(searchString) : null) ||
          (potClient.companyName ? potClient.companyName.toLowerCase().includes(searchString) : null) ||
          (potClient.name ? potClient.name.toLocaleLowerCase().includes(searchString) : null) ||
          (potClient.contacts.phone ? searchString.replace(/\D+/g, "") !== '' ?
            potClient.contacts.phone.toLocaleLowerCase().replace(/\D+/g, "").includes(searchString.replace(/\D+/g, "")) : null
          : null) ||
          (potClient.contacts.name ? potClient.contacts.name.toLocaleLowerCase().includes(searchString) : null) ||
          (potClient.contacts.email ? potClient.contacts.email.toLocaleLowerCase().includes(searchString) : null) ||
          ((potClient.lastEvent && potClient.lastEvent.comment) ? textBlock.innerText.toLocaleLowerCase().includes(searchString) : null)
        }
      );
    }

    if (filterValue.EventDate) {
      const begin = filterValue.EventDate.begin.setHours(0, 0, 0, 0);
      const end = filterValue.EventDate.end.setHours(0, 0, 0, 0);
      this.potentialClients = this.potentialClients.filter(potClient => {
          if (!potClient.lastEvent) {
            return false;
          }
          const itemDate = new Date(potClient.lastEvent.date).setHours(0, 0, 0, 0);
          return (begin <= itemDate) && (end >= itemDate);
        }
      );
    }

    if (filterValue.AddingDate) {
      const begin = filterValue.AddingDate.begin.setHours(0, 0, 0, 0);
      const end = filterValue.AddingDate.end.setHours(0, 0, 0, 0);
      this.potentialClients = this.potentialClients.filter(potClient => {
          const itemDate = new Date(potClient.additionDate).setHours(0, 0, 0, 0);
          return (begin <= itemDate) && (end >= itemDate);
        }
      );
    }

    if (filterValue.CallDate) {
      const begin = filterValue.CallDate.begin.setHours(0, 0, 0, 0);
      const end = filterValue.CallDate.end.setHours(0, 0, 0, 0);
      this.potentialClients = this.potentialClients.filter(potClient => {
          if (!potClient.lastEvent) {
            return false;
          }
          const itemDate = new Date(potClient.lastEvent.notificationDate).setHours(0, 0, 0, 0);
          return (begin <= itemDate) && (end >= itemDate);
        }
      );
    }

    const selectedManagers = this.selectedManager().map( x => x.body.id);
    if (selectedManagers.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        return selectedManagers.some(id => {
          return client.managers.some(x => x.id === id);
        });
      });
    }

    const selectedCountry = this.selectedCountry().map(x => x.body.code.toLocaleLowerCase());
    if(selectedCountry.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        if (client.countryName) {
          return selectedCountry.includes(client.countryCode.toLocaleLowerCase());
        }
      });
    }

    const selectedClientType = this.selectedClientType().map(x => x.body.id);
    if(selectedClientType.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        if (client.type) {
          return selectedClientType.includes((<CompanyType>client.type).id);
        }
      });
    }

    const selectedEventResult = this.selectedEventResult().map( x => x.body.id);
    if (selectedEventResult.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        if (client.lastEvent) {
          return selectedEventResult.includes(client.lastEvent.eventsResult);
        }
        return false;
      });
    }

    const selectedEventType = this.selectedEventType().map( x => x.body.id);
    if (selectedEventType.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        if (client.lastEvent) {
          return selectedEventType.includes(client.lastEvent.eventAction);
        }
        return false;
      });
    }

    const selectedWayToAddTypes = this.selectedWayToAdd().map(x => x.body.id);
    if (selectedWayToAddTypes.length > 0) {
      this.potentialClients = this.potentialClients.filter(client => {
        if (client.wayToAdd !== null) {
          return selectedWayToAddTypes.includes((<WayToAdd>client.wayToAdd).id);
        }
        return false;
      });
    }

    if (this.showTestClients) {
      this.potentialClients = this.potentialClients.filter(client => client.isDemo);
    }

    this.saveLocalStorage();
    if (this.paginator) {
      this.paginator.firstPage();
    }

    this.pageEvent.length =this.potentialClients.length;
  }
  /* END filter */

  paginationPotentialClients(): PotentialClient[] {
    // TODO
    // clients = clients.filter(x => {
    //   if (x.LastEvent && x.LastEvent.NotificationDate !== null) {
    //     return new Date(x.LastEvent.NotificationDate).setHours(0, 0, 0, 0) !== new Date().setHours(0, 0, 0, 0);
    //   } else {
    //     return true;
    //   }
    // });
    let clients = new Set(this.potentialClients);
    this.urgentPotentialClients()
      .forEach(u => clients.delete(u));

    return Array.from(clients).slice(
      ((this.pageEvent.pageIndex - 1) * this.pageEvent.pageSize),
      (this.pageEvent.pageIndex * this.pageEvent.pageSize)
    );
  }

  urgentPotentialClients(): PotentialClient[] {
    // return this.potentialClients.slice(0, 5);
    // TODO
    return this.potentialClients ? this.potentialClients.filter(x => {
      if (x.lastEvent && x.lastEvent.notificationDate !== null) {
        return new Date(x.lastEvent.notificationDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
      }
    }) : null;
  }

  selectedCountry() {
    return this.countriesList.filter(x => x.selected);
  }

  selectedClientType() {
    return this.clientTypeList.filter(x => x.selected);
  }

  selectedManager() {
    return this.managersList.filter(x => x.selected);
  }

  selectedEventResult() {
    return this.eventResult.filter(x => x.selected);
  }

  selectedEventType() {
    return this.eventAction.filter(x => x.selected);
  }

  selectedWayToAdd() {
    return this.wayToAddList.filter(x => x.selected);
  }

  /* pagination */
  initEventPage() {
    this.pageEvent.previousPageIndex = 0;
    this.pageEvent.pageIndex = 1;
    this.pageEvent.pageSize = 20;
    this.pageEvent.length = 0;
  }

  pagination(event) {
    this.pageEvent = event;
    this.pageEvent.pageIndex = this.pageEvent.pageIndex + 1;
  }
  /* END pagination */

  checkNotificationDate(date: Date) {
    const day = 86400000;
    if (date !== null) {
      const notificationDate = new Date(date).setHours(0, 0, 0, 0);
      const dateNow = new Date().setHours(0, 0, 0, 0);
      if (notificationDate >= dateNow) {
        const days = (notificationDate - dateNow) / day;
        return 5 > days && days >= 0;
      }
    }
    return false;
  }

  findEventResult(id: number): EventsResult {
    return this.eventResult.find(x => x.body.id === id).body;
  }

  findEventAction(id: number): EventsAction {
    return this.eventAction.find(x => x.body.id === id).body;
  }

  clearSettings() {
    this.filterForm.reset();
    this.eventResult.forEach(x => x.selected = false);
    this.wayToAddList.forEach(x => x.selected = false);
    this.eventAction.forEach(x => x.selected = false);
    this.managersList.forEach(x => x.selected = false);
    this.countriesList.forEach(x => x.selected = false);
    this.clientTypeList.forEach(x => x.selected = false);
    this.showTestClients = false;
    this.localStorageService.remove(StorageKey.Potential_Clients_Filter);
  }

  saveLocalStorage() {
    this.localStorageService.set<IPotentialClientsFilter>(StorageKey.Potential_Clients_Filter,
        {
          filterForm: this.filterForm.value,
          eventResult: this.eventResult,
          wayToAddList: this.wayToAddList,
          eventAction: this.eventAction,
          managersList: this.managersList,
          countriesList: this.countriesList,
          clientTypeList: this.clientTypeList,
          showTestClients: this.showTestClients,
        });
  }

  initFromLocalStorage() {
    try {
      if (this.localStorageService.get<IPotentialClientsFilter>(StorageKey.Potential_Clients_Filter)) {
        let filter = this.localStorageService.get<IPotentialClientsFilter>(StorageKey.Potential_Clients_Filter);
        this.filterForm.setValue(filter.filterForm);
        this.eventResult = filter.eventResult;
        this.wayToAddList = filter.wayToAddList;
        this.eventAction = filter.eventAction;
        this.managersList = filter.managersList;
        this.countriesList = filter.countriesList;
        this.clientTypeList = filter.clientTypeList;
        this.showTestClients = filter.showTestClients;
      }
    } catch (e) {
      this.localStorageService.remove(StorageKey.Potential_Clients_Filter);
    }

  }


}
