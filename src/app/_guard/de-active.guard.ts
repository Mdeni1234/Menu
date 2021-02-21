import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from '../_service/alert.service';
import { SignInComponent } from '../sign/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root'
})
export class DeActiveGuard implements CanDeactivate <SignInComponent> {
  constructor(public alert : AlertService) {}

  canDeactivate( target: SignInComponent) {
    this.alert.hide();
    return true
  }
}
