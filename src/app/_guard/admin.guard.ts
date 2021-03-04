import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../_service/alert.service';
import { AuthService } from '../_service/auth.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public alert: AlertService
  ) {}
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {
  //     const currentUser = this.authService.currentUserValue;
  //     if (currentUser) {
  //         // authorised so return true
  //         return true;
  //     }

  //     // not logged in so redirect to login page with the return url
  //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
  //     return false;
  // }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => user && user.roles.admin ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          console.error('Access denied - Admins only');
          this.router.navigate(['/akses']);
        }
      })
    );
  }
}
