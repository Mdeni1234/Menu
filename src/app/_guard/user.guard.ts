import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { AuthService } from '../_service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate  {
  constructor(private auth: AuthService,
    private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.user$.pipe(
      take(1),
      map((user) => {
        if(this.auth.isAdmin(user)) {
            this.router.navigate(['/penjualan']);
          } else if (this.auth.isGerai(user)) {
              this.router.navigate(['/menu']);
          } else if (this.auth.isUser(user)) {
             this.router.navigate(['/akses']);
        } else {
           this.router.navigate(['/login']);
        }
        return true;
      })
    );
  }
}
