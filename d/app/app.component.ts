import { Component, OnInit } from '@angular/core';
import { MenuService } from './_service/menu.service';
import { AuthService } from './_service/auth.service';
import { Router } from '@angular/router';
import { User } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  hasil : any[];
  scrollTop=0;
  hideNa = false;
  constructor(
    public service: AuthService
  ) {}
 ngOnInit(){
 }


}
