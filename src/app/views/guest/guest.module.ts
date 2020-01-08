import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestRoutingModule} from './guest-routing.module';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
