import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable, ObservedValueOf } from 'rxjs';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SercureInnerPagesGuard {
  constructor(
    public authService: AuthService,
    public router: Router
  ) {}
  // canActivate(
  //   // next: ActivatedRouteSnapshot,
  //   // state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
  //   //   if(this.authService.isLoggedIn) {
  //   //     window.alert('Tidak bisa mengakses');
  //   //     this.router.navigate(['main'])
  //   //   }
  //   //   return true
  //   }
}
 