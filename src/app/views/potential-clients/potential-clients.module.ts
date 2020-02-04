import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PotentialListComponent} from './potential-list/potential-list.component';
import {SharedModule} from '../../shared/shared.module';
import {PotentialClientsRoutingModule} from './potential-clients-routing.module';



@NgModule({
  declarations: [
    PotentialListComponent
  ],
  imports: [
    CommonModule,
    PotentialClientsRoutingModule,
    SharedModule
  ]
})
export class PotentialClientsModule { }
