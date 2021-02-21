import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_service/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_service/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
      private router: Router,
      public authenticationService: AuthService,
      private alertService: AlertService
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.user$ != null) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
  }
}