import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestRoutingModule} from './guest-routing.module';
import {LoginComponent} from './login/login.component';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    GuestRoutingModule
  ]
})
export class GuestModule { }
