import { Injectable } from '@angular/core';
import { AlertService } from './alert.service';
import { Menu } from '../_model/menu.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { MatDialog } from '@angular/material/';
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
import { User } from '../_model/user.model';




@Injectable({
  providedIn: 'root'
})
export class MenuService {
  uri = 'http://localhost:5000/menu';
  formData: Menu;


  constructor(
    private alert: AlertService,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private auth: AuthService,
    private geraiService: GeraiService
  ) {
   
    
  }
  
  addMenu(value: any ) {
    // tslint:disable-next-line: prefer-const
    let namaMenu = value.namaMenu;
    let idGerai = value.idGerai;
    const hargaMenu = value.hargaMenu;
    const stok = value.stok;
    const menu = {
      namaMenu,
      hargaMenu,
      stok
    };
    console.log(value)
    this.firestore.doc('gerai/' + idGerai).collection('menu').add(menu);
  }
  updateMenu(updateMenu: any) {
    this.firestore.collection('gerai').doc(updateMenu.idGerai).collection('menu').doc(updateMenu.id).update(updateMenu);
  }
  updateStokMenu(id, update, idGerai) {
    console.log(id, update);
    this.firestore.collection('gerai').doc(idGerai).collection('menu').doc(id).update({stok: update});
  }
  deleteMenu(idGerai, id) {
    this.firestore.collection('gerai').doc(idGerai).collection('menu').doc(id).delete();
  }
  
  getMenu(id) {
    console.log(id)
    return this.firestore.collection('gerai').doc(id).collection('menu').snapshotChanges();
  }
  getMenuAdmin(id:string) {
    return this.firestore.collection('gerai').doc(id).collection('menu').snapshotChanges();
  }
  
}
