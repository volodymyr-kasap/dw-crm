import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from './layouts/main/main-layout.component';
import {AuthGuard} from './guards/auth.guard';
import {GuestLayoutComponent} from './layouts/guest/guest-layout.component';

const routes: Routes = [
    {
      path: '',
      component: MainLayoutComponent,
      children: [
        {
          path: '',
          loadChildren: () => import('./views/index/index.module').then(module => module.IndexModule)
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
