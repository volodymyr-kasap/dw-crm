import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {reducers} from './store';
import {httpInterceptorProviders} from './core/interceptors';
import {QueryProgressBarComponent} from './components/layout/query-progress-bar/query-progress-bar.component';
import {SharedModule} from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    QueryProgressBarComponent,
    MainLayoutComponent,
    GuestLayoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    SharedModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
