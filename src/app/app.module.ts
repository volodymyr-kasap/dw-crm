import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import localeRu from '@angular/common/locales/ru';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {StoreModule} from '@ngrx/store';
import {metaReducers, reducers} from './store';
import {httpInterceptorProviders} from './core/interceptors';
import {MainLayoutModule} from './layouts/main/main-layout.module';
import {GuestLayoutModule} from './layouts/guest/guest-layout.module';
import {CommonModule, registerLocaleData} from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    //StoreModule.forRoot(reducers, { metaReducers }),
    MainLayoutModule,
    GuestLayoutModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru' },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
