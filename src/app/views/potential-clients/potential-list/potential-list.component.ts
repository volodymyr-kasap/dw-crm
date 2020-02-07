import {Component, OnDestroy, OnInit} from '@angular/core';
import * as indexReducer from '../../../store/index';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ISelectedFilter} from '../../../interfaces/selected-filter.interface';
import {PotentialClientService} from '../../../services/potential-client.service';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {PotentialClient} from '../../../models/potential-client.model';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-potential-list',
  templateUrl: './potential-list.component.html',
  styleUrls: ['./potential-list.component.scss']
})
export class PotentialListComponent implements OnInit, OnDestroy {

  potentialClients: PotentialClient[] = [];

  /* filter */
  subscription = new Subscription();
  filterForm: FormGroup;
  managersList: ISelectedFilter[] = [];
  countriesList: ISelectedFilter[] = [];
  clientTypeList: ISelectedFilter[] = [];
  eventsAction: ISelectedFilter[]  = [];
  eventResult: ISelectedFilter[] = [];
  wayToAddList: ISelectedFilter[] = [];
  showTestClients = false;
  /* END filter */

  pageEvent: PageEvent = new PageEvent();
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(
    private store: Store<indexReducer.State>,
    private potentialClientService: PotentialClientService,
    private fb: FormBuilder,
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
          this.eventsAction = state.potential.eventsActionList.map( x => ({selected: false, body: x }));
          this.eventResult = state.potential.eventResultList.map( x => ({selected: false, body: x }));
          this.clientTypeList = state.potential.companyTypesList.map( x => ({selected: false, body: x }));
          this.filterPotentialClients();
        }
    });
    this.subscription.add(store$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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

  /* filter */
  filterPotentialClients() {
    this.store.select(state => state.potential.clientList)
      .subscribe(clients => {
        if (clients) {
          this.potentialClients = clients;
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
      this.potentialClients = this.potentialClients.filter(x => {
          const itemDate = new Date(x.additionDate).setHours(0, 0, 0, 0);
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
          const itemDate = potClient.lastEvent.notificationDate.setHours(0, 0, 0, 0);
          return (begin <= itemDate) && (end >= itemDate);
        }
      );
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
    return this.potentialClients.filter(x => {
      if (x.lastEvent && x.lastEvent.notificationDate !== null) {
        return new Date(x.lastEvent.notificationDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
      }
    });
  }

  selectedCountry() {
    return this.countriesList.filter(x => x.selected);
  }


}
