import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guards/auth.guard';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {IndexComponent} from './views/index/index.component';


const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: 'Index',
          component: IndexComponent
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'Index'
        }
      ],
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
