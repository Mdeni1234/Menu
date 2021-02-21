import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { take, map, tap } from 'rxjs/operators';
import { AlertService } from '../_service/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
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
      map(user => user && user.roles.admin || user.roles.user ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/login']);
        }
        this.alert.show(); 
      })
    );

  }
}