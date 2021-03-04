import { Component, OnInit, NgModule } from '@angular/core';
import { User } from '../_model/user';
import { MenuService } from '../_service/menu.service';
import { AuthService } from '../_service/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../_service/alert.service';
import { Pesanan } from '../_model/pesanan.model';
import {MainMenuComponent} from '../main-menu/main-menu.component';
import { PesananService } from '../_service/pesanan.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  title = 'Warung Nasi Kang Mandor';
  hitungPesan: any;
  a: any[] ;
  user: any;
  navLinks: any[];
  activeLinkIndex = -1;



  constructor(
    private service: PesananService,
    public authService: AuthService,
    private router: Router,
    public alert: AlertService,
  ) {
    
  }
  ngOnInit() {
    
    (this.authService.user$).subscribe( usr => {
       if (this.authService.isAdmin(usr)) {
        this.navLinks = [
           {
              link: '/penjualan',
              index: 1,
              icon: 'near_me',
              badge: this.hitungPesan,
              status: true
    
          }, {
              link: '/gerai',
              index: 2,
              icon: 'menu_open',
              badge: '',
              status: false
            }
      ];
       } else {
        this.navLinks = [
          {
              link: '/menu',
              index: 0,
              icon: 'store_mall_directory',
              badge: '',
              status: false
          }, {
              link: '/penjualan',
              index: 1,
              icon: 'near_me',
              badge: this.hitungPesan,
              status: true
    
          }
      ];
       }
    });
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '' + this.router.url+''));
    });
    return this.service.hitungPesanan().subscribe((pesan) => {
      console.log(pesan);
      this.a =  pesan;
      this.hitungPesan = this.a.length;
      if ( this.a.length == 0 ) {
        this.hitungPesan = '';
      }
    });
  }

  changeStatus() {
    console.log('ok');
    const status = true;
    setTimeout( () => {
    this.service.gantiStatus(status);
    }, 1000);
    this.ngOnInit();
  }
  logout() {
    if (confirm('Anda akan Logout?')) {
    this.authService.signOut();
    this.router.navigate(['/login']);
    }
}

}
