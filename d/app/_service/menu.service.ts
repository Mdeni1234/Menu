import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { Observable } from 'rxjs';
import { Pesanan } from '../_model/pesanan.model';
import { Menu } from '../_model/menu.model';
import { formatDate } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { DatePipe } from '@angular/common';
import { isNgTemplate } from '@angular/compiler';
import { MatDialog } from '@angular/material';
import { NotifComponent } from '../main-menu/notif/notif.component';
import { HasilPenjualanComponent } from '../list-pesanan/hasil-penjualan/hasil-penjualan.component';
import { Penjualan } from '../_model/penjualan.model';



@Injectable({
  providedIn: 'root'
})
export class MenuService {
  uri = 'http://localhost:5000/menu';
  formData: Menu;
  now : Date = ( d => new Date(d.setDate(d.getDate() - 1  )))(new Date);
  status : boolean;
  waktu : Date = new Date();
  jam = this.waktu.getHours();
  format = 'dd/MM/yyyy';
  locale = 'en-US';
  tgl = formatDate(this.now, this.format, this.locale);


  constructor(
    private alert: AlertService,
    private firestore: AngularFirestore,
    public dialog: MatDialog
  ) {
    this.penjualan();
  }
  addMenu(value) {
    let namaMenu = value.namaMenu
    let hargaMenu = value.hargaMenu
    let stok = value.stok
    const menu = {
      namaMenu,
      hargaMenu,
      stok
    };
    this.firestore.collection('menu').add(menu);
  }
  updateMenu(updateMenu){
    this.firestore.doc('menu/' + updateMenu.id).update(updateMenu);
  }
  updateStokMenu(id, update) {
    console.log(id, update)
    this.firestore.doc('menu/' + id).update({"stok": update});
  }
  deleteMenu(id) {
    this.firestore.doc('menu/' + id).delete();
  }
  addPesanan(index, jumlah, pesan){
  let waktu = new Date(Date.now());
  let pesanan = []
  let status:boolean = false;
  let tag : number = 1;
  for ( let a = 0; a < index; a++) {
    pesanan.push({
      namaPesanan: pesan.pesanan[a].namaPesanan,
      hargaPesanan: pesan.pesanan[a].hargaPesanan,
      jumlahPesanan: pesan.pesanan[a].jumlahPesanan
    })
  }
 
  const pemesanan = {
    tag,
    waktu,
    pesanan,
    jumlah,
    status
  }    
  //  this.http.post(`${this.uri}/addPesanan`, pemesanan).subscribe( res => {
  //    
  //  })
  this.firestore.collection('pesanan').add(pemesanan);
  this.alert.sukses('Pesanan telah ditambahkan :)', '1');

  }
  getMenu(){
    return this.firestore.collection('menu').snapshotChanges();
  }
  getPesanan()  {
    return this.firestore.collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
  }
  getPenjualan()  {
    // return this.firestore.collection('penjualan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
    const refA = firebase.firestore().collection('pesanan');
    const refB = firebase.firestore().collection('penjualan');

   return Promise.all([ 
     refA.get(), 
     refB.get() 
    ]).then(promiseResults => {
        const mergedData = [];
        promiseResults.forEach( snapshot => {
            snapshot.forEach( doc => mergedData.push(doc.data()) );
        });
        return mergedData;
      }).then(mergedData => mergedData.sort((a, b) => b.waktu.toDate() - a.waktu.toDate())).then(sortedData => {
        return sortedData;
      }).catch(e => console.error(e));
  }

  hitungPesanan() {
    return this.firestore.collection('pesanan', pesan => pesan.where('status', '==', false)).snapshotChanges();
  }
  gantiStatus(a) {
   this.firestore.collection('pesanan').get().toPromise().then((data) => {
     data.forEach( doc => {
       let pesanan = this.firestore.collection('pesanan').doc(doc.id);
       return pesanan.update({
         status: a
       })
     })
   }).catch(err=> {
     console.log(err);
   })
}


penjualan() {
  let a;
  return this.firestore.collection('penjualan', jual => jual.orderBy('waktu', 'desc').limit(1)).get().toPromise().then(data => {
    data.docs.map (
      doc => {
         a = formatDate(doc.data().waktu.toDate(), 'dd', this.locale);
      })
      console.log(data.docs.length <= 0)
    if(data.docs.length <= 0) {
      this.status = true;
      this.setPenjualan();
    } else {
     return data.docs.map( doc => {
       console.log(doc.data())
        let waktu  = formatDate(doc.data().waktu.toDate(), this.format, this.locale);
        console.log(this.tgl, waktu)
        if (this.tgl != waktu){
          this.status = true;
          this.setPenjualan();
        }
      })
    }
  })
}
setPenjualan() {
  const Menu = {}
  let jumlah : number = 0;
  let jumlahPesanan: number = 0
  let namaPesanan;
  let date : any;
  let tag : number = 2;
  let menu = [];
  let f = [];
  let jPenjualan : number = 0;
  let d : number = 1;
  let e : number= 0;
  if (this.status == true) {
    if ( this.jam > 0 || this.jam < 3 ) {
      this.getMenu().subscribe( item => {
        menu = item.map( d => {
          return {
            ...d.payload.doc.data() as Menu
          }
        })
      });
    return this.firestore.collection('pesanan').get().toPromise().then(data => {
      for ( let t = 0; t < menu.length; t++) {
      data.forEach( doc => {
       let a = 0, b = 0;
          date = formatDate(doc.data().waktu.toDate(), this.format, this.locale);
          if( date == this.tgl) {
                if (menu[t].namaMenu ==  doc.data().pesanan[a].namaPesanan )
                {
                  jPenjualan++;
                  jumlah = jumlah + (doc.data().jumlah - 0);
                  namaPesanan = doc.data().pesanan[a].namaPesanan;
                  jumlahPesanan = jumlahPesanan + doc.data().pesanan[a].jumlahPesanan;
                  b++;
                  e = e + b;
                }
              }
        a++
      })
      if (d < e) {
        d++
        f.push({
          terjual : jumlahPesanan,
          namaPesanan : namaPesanan
        })
      }
     }
     if( date == this.tgl) {
        const penjualan = {
          waktu: new Date(Date.now()),
          tag : tag,
          penjualan: f,
          jumlahPenjualan: jPenjualan,
          hasilPenjualan : jumlah,
        }
        this.firestore.collection('penjualan').add(penjualan);
        const dialogRef = this.dialog.open(HasilPenjualanComponent, {
          width: '80%',
          data: penjualan
        })

    }
  })
    }
    this.status = false;
  }
}
hitung(s) {

}

}