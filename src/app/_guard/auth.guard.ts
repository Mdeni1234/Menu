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
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map(user => user && this.auth.isAdmin(user) || this.auth.isGerai(user) ? true : false),
      tap(isAdmin => {
        if (!isAdmin) {
          this.router.navigate(['/penjualan']);
          console.error('cant access')
        }
        this.alert.show(); 
      })
    );
  
  }
}