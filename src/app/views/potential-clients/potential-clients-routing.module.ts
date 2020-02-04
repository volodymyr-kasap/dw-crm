import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PotentialListComponent} from './potential-list/potential-list.component';

const routes: Routes = [
  { path: 'List', component: PotentialListComponent },
  {
    path: '**',
    redirectTo: 'List'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PotentialClientsRoutingModule { }
