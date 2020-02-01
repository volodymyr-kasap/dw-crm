import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestLayoutComponent} from './guest-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    GuestLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class GuestLayoutModule { }
