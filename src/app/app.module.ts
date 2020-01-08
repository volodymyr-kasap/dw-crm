import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {GuestLayoutModule} from './layouts/guest/guest-layout.module';
import {MainLayoutModule} from './layouts/main/main-layout.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MainLayoutModule,
    GuestLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
