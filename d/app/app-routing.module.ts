import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu';
import { SetelanComponent } from './setelan/setelan.component';
import { ListPesananComponent } from './list-pesanan/list-pesanan.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SercureInnerPagesGuard } from './_guard/sercure-inner-pages.guard'
import { AuthGuard } from './_guard/auth.guard';
import { DeActiveGuard } from './_guard/de-active.guard';

const routes: Routes = [
  { path:'login', component: SignInComponent, canDeactivate: [DeActiveGuard] },
  { path: '', component: MainMenuComponent, canActivate: [AuthGuard]},
  { path: 'menu', component: MainMenuComponent, canActivate: [AuthGuard]},
  { path: 'setelan', component: SetelanComponent, canActivate: [AuthGuard]},
  { path: 'penjualan', component: ListPesananComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
