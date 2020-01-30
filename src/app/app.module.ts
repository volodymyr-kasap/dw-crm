import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';
import {AuthService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {httpInterceptorProviders} from './core/interceptors';
import {QueryProgressBarComponent} from './components/query-progress-bar/query-progress-bar.component';
import {SharedModule} from './shared/shared.module';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import {AppInitService} from './core/services/app-init.service';
import {LocalStorageService} from './core/services/local-storage.service';
import {AuthApi} from './core/api/auth.api';
import {MainApi} from './core/api/main.api';


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
    StoreModule.forRoot(reducers, { metaReducers }),
    SharedModule
  ],
  providers: [
    AppInitService,
    {provide: APP_INITIALIZER, useFactory: (config: AppInitService) => () => config.init(), deps: [AppInitService], multi: true},
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
