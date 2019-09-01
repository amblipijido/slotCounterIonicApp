import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './services/authentication.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import ('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'drivers',
    loadChildren: () => import('./pages/drivers/drivers.module').then(m => m.DriversPageModule),
    canActivate: [AuthenticationGuard]
  },
  { path: 'cars/form',
  loadChildren: () => import('./pages/cars/car.form/car.form.module').then(m => m.CarFormPageModule),
  canActivate: [AuthenticationGuard]
  },
  { path: 'cars', loadChildren: './pages/cars/car-list/car-list.module#CarListPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule {}
