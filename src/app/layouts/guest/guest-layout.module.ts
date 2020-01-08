import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GuestLayoutComponent} from './guest-layout.component';
import {LoginComponent} from '../../views/guest/login/login.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    GuestLayoutComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class GuestLayoutModule { }
