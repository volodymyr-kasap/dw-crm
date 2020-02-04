import {Component, OnDestroy, OnInit} from '@angular/core';
import * as indexReducer from '../../../store/index';
import {Store} from '@ngrx/store';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ISelectedFilter} from '../../../interfaces/selected-filter.interface';
import {PotentialClientService} from '../../../services/potential-client.service';
import {PageEvent} from '@angular/material';
import {Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {PotentialClient} from '../../../models/potential-client.model';

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
  countries: ISelectedFilter[] = [];
  clientType: ISelectedFilter[] = [];
  eventsAction: ISelectedFilter[]  = [];
  eventResult: ISelectedFilter[] = [];
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
    this.filterPotentialClients();
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
    filterValue.Filter = filterValue.Filter.trim();

    if (filterValue.Filter) {
      this.potentialClients = this.potentialClients.filter(potClient => {
        // let textBlock = document.createElement('div');
        // if (x.LastEvent && x.LastEvent.Comments) {
        //   textBlock.innerHTML = x.LastEvent.Comments;
        // }
        const searchString = filterValue.Filter.toLowerCase();

        return (potClient.id ? potClient.id.toString().includes(searchString) : null) ||
          (potClient.companyName ? potClient.companyName.toLowerCase().includes(searchString) : null) ||
          (potClient.name ? potClient.name.toLocaleLowerCase().includes(searchString) : null);
          // (x.Contacts.Phone ? filterValue.Filter.toLowerCase().replace(/\D+/g, "") !== '' ?
          //   x.Contacts.Phone.toLowerCase().replace(/\D+/g, "")
          //     .includes(filterValue.Filter.toLowerCase().replace(/\D+/g, ""))
          //   : null
          //   : null) ||
          // (x.Contacts.Name ? x.Contacts.Name.toLowerCase().includes(filterValue.Filter.toLowerCase()) : null) ||
          // (x.Contacts.Email ? x.Contacts.Email.toLowerCase().includes(filterValue.Filter.toLowerCase()) : null) ||
          //((x.LastEvent && x.LastEvent.Comments) ? textBlock.innerText.toLowerCase().includes(filterValue.Filter.toLowerCase()) : null);
        }
      );
    }

    // if (filterValue.EventDate) {
    //   const begin = filterValue.EventDate.begin.setHours(0, 0, 0, 0);
    //   const end = filterValue.EventDate.end.setHours(0, 0, 0, 0);
    //   this.potentialClients = this.potentialClients.filter(x => {
    //       if (!x.LastEvent) {
    //         return false;
    //       }
    //       const itemDate = new Date(x.LastEvent.Date).setHours(0, 0, 0, 0);
    //       return (begin <= itemDate) && (end >= itemDate);
    //     }
    //   );
    // }

    if (filterValue.AddingDate) {
      const begin = filterValue.AddingDate.begin.setHours(0, 0, 0, 0);
      const end = filterValue.AddingDate.end.setHours(0, 0, 0, 0);
      this.potentialClients = this.potentialClients.filter(x => {
          const itemDate = new Date(x.creationDate).setHours(0, 0, 0, 0);
          return (begin <= itemDate) && (end >= itemDate);
        }
      );
    }

    // if (filterValue.CallDate) {
    //   const begin = filterValue.CallDate.begin.setHours(0, 0, 0, 0);
    //   const end = filterValue.CallDate.end.setHours(0, 0, 0, 0);
    //   this.potentialClients = this.potentialClients.filter(x => {
    //       if (!x.LastEvent) {
    //         return false;
    //       }
    //       const itemDate = new Date(x.LastEvent.NotificationDate).setHours(0, 0, 0, 0);
    //       return (begin <= itemDate) && (end >= itemDate);
    //     }
    //   );
    // }

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
    return this.potentialClients.slice(0, 5);
    // TODO
    // return this.potentialClients.filter(x => {
    //   if (x.LastEvent && x.LastEvent.NotificationDate !== null) {
    //     return new Date(x.LastEvent.NotificationDate).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0);
    //   }
    // });
  }


}
