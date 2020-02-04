import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PotentialListComponent} from './potential-list/potential-list.component';
import {SharedModule} from '../../shared/shared.module';
import {PotentialClientsRoutingModule} from './potential-clients-routing.module';
import {PotentialClientService} from '../../services/potential-client.service';
import {PotentialClientApi} from '../../core/api/potential-client.api';



@NgModule({
  declarations: [
    PotentialListComponent
  ],
  imports: [
    CommonModule,
    PotentialClientsRoutingModule,
    SharedModule
  ],
  providers: [
    PotentialClientApi,
    PotentialClientService
  ]
})
export class PotentialClientsModule { }
