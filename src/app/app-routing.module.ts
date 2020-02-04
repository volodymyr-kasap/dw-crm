import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {AuthGuard} from './core/guards/auth.guard';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';

const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./views/index/index.module').then(module => module.IndexModule)
        },
        {
          path: 'PotentialClients',
          loadChildren: () => import('./views/potential-clients/potential-clients.module').then(module => module.PotentialClientsModule)
        }
      ],
      canActivate: [
        AuthGuard
      ]
    },
    {
      path: '',
      component: GuestLayoutComponent,
      children: [
        {
          path: 'Guest',
          loadChildren: () => import('./views/guest/guest.module').then(module => module.GuestModule)
        }
      ]
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
