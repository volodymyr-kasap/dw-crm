import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {httpInterceptorProviders} from './core/interceptors';
import {QueryProgressBarComponent} from './components/query-progress-bar/query-progress-bar.component';
import {SharedModule} from './shared/shared.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';



@NgModule({
  declarations: [
    AppComponent,
    QueryProgressBarComponent,
    MainLayoutComponent,
    GuestLayoutComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    //StoreModule.forRoot(reducers, { metaReducers }),
    SharedModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
