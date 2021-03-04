import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Menu } from '../_model/menu.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pesanan } from '../_model/pesanan.model';
import { DatePipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { NotifComponent } from '../main-menu/notif/notif.component';
import { HasilPenjualanComponent } from '../list-pesanan/hasil-penjualan/hasil-penjualan.component';
import { Penjualan } from '../_model/penjualan.model';
import { AuthService } from './auth.service';
import { GeraiService } from './gerai.service';
import { User } from '../_model/user';




@Injectable({
  providedIn: 'root'
})
export class MenuService {
  uri = 'http://localhost:5000/menu';
  formData: Menu;
  gerai;

  constructor(
    private alert: AlertService,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private auth: AuthService,
    private geraiService: GeraiService
  ) {
    this.setUser();
  }
   getGerai(usr: any) {
     return this.geraiService.ambilGerai().subscribe( val => {
      val.forEach( a => {
        let b = a.payload.doc.data()['user']['uid'];
        if (b == usr.uid ) {
          return this.gerai = {
            id : a.payload.doc.id,
            profile : a.payload.doc.data(),
          }
        }
      });
      });
  }
   setUser() {
    return this.auth.user$.subscribe(val => {
      return this.getGerai(val);
    });
  }
  addMenu(value: any ) {
    // tslint:disable-next-line: prefer-const
    let namaMenu = value.namaMenu;
    const hargaMenu = value.hargaMenu;
    const stok = value.stok;
    const menu = {
      namaMenu,
      hargaMenu,
      stok
    };
    this.firestore.doc('gerai/' + this.gerai.id).collection('menu').add(menu);
  }
  updateMenu(updateMenu: any) {
    this.firestore.collection('gerai').doc(this.gerai.id).collection('menu').doc(updateMenu.id).update(updateMenu);
  }
  updateStokMenu(id, update) {
    console.log(id, update);
    this.firestore.collection('gerai').doc(this.gerai.id).collection('menu').doc(id).update({stok: update});
  }
  deleteMenu(id) {
    this.firestore.doc('menu/' + id).delete();
  }
  
  getMenu() {
    return this.firestore.collection('gerai').doc(this.gerai.id).collection('menu').snapshotChanges();
  }
  getMenuAdmin(id:string) {
    return this.firestore.collection('gerai').doc(id).collection('menu').snapshotChanges();
  }
  
}
