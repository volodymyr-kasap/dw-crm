import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainLayoutComponent} from './main-layout.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {SideMenuListComponent} from './side-menu-list/side-menu-list.component';
import {SharedModule} from '../../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [
    MainLayoutComponent,
    SideMenuComponent,
    SideMenuListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ]
})
export class MainLayoutModule { }
