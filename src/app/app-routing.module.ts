import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu';
import { SetelanComponent } from './setelan/setelan.component';
import { ListPesananComponent } from './list-pesanan/list-pesanan.component';
import { SignInComponent } from './sign/sign-in/sign-in.component';
import { SercureInnerPagesGuard } from './_guard/sercure-inner-pages.guard'
import { AuthGuard } from './_guard/auth.guard';
import { DeActiveGuard } from './_guard/de-active.guard';
import { GeraiComponent } from './gerai/gerai.component';
import { AdminGuard } from './_guard/admin.guard';
import { CanReadGuard } from './_guard/can-read.guard';

const routes: Routes = [
  { path: 'login', component: SignInComponent, canDeactivate: [DeActiveGuard] },
  { path: 'menu', component: MainMenuComponent, canActivate: [CanReadGuard]},
  { path: 'setelmenu', component: SetelanComponent, canActivate: [AdminGuard]},
  { path: 'penjualan', component: ListPesananComponent, canActivate: [AuthGuard]},
  { path: 'gerai', component: GeraiComponent, canActivate: [AdminGuard]},
  { path: '**', redirectTo: 'menu'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
