import { JadwalService } from './_service/jadwal.service';
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
export class AppComponent implements OnInit {
  constructor(
    private js: JadwalService
  ) {}
 ngOnInit() {
   this.js.pilihMetode();

 }

}
