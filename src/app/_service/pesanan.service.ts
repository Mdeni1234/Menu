import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/';
import { AlertService } from '../_service/alert.service';
import { AuthService } from './auth.service';
import { GeraiService } from './gerai.service';
import * as firebase from 'firebase/app';
import { observable, Observable, of } from 'rxjs';
import { Pesanan } from '../_model/pesanan.model';
import { map, switchMap, take } from 'rxjs/operators';
import { formatDate } from '@angular/common';



@Injectable({
  providedIn: 'root'
})
export class PesananService {
  data;
  gerai;
  jualan: Observable<boolean>
  constructor(
    private alert: AlertService,
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    private auth: AuthService,
    private geraiService: GeraiService
  ) {

    this.setUser();
   }
    getPenjualan()  {
     return this.firestore.collection('penjualan').snapshotChanges()
  }

   resetPenjualan(){
     let penjualan = this.firestore.collection('penjualan')
     penjualan.snapshotChanges().subscribe(doc => {
       doc.forEach(res => {
         return penjualan.doc(res.payload.doc.id).delete()
       })
     })
   }
  
  getGerai(usr: any) {
    return this.geraiService.ambilGerai().subscribe( val => {
     val.forEach( a => {
       let b = a.payload.doc.data()['user'];
       if (b.email == usr.email ) {
          this.gerai = a.payload.doc.data()
       }
     });
     });
 }
  setUser() {
   return this.auth.user$.subscribe(val => {
     return this.getGerai(val);
   });
 }
  addPesanan(index, jumlah, pesan) {
    const waktu = new Date(Date.now());
    const idGerai = this.gerai.id;
    const pesanan = [];
    const status = false;
    const raw = true;
    const tag = 1;
    for ( let a = 0; a < index; a++) {
      pesanan.push({
        namaPesanan: pesan.pesanan[a].namaPesanan,
        hargaPesanan: pesan.pesanan[a].hargaPesanan,
        jumlahPesanan: pesan.pesanan[a].jumlahPesanan
      });
    }
  
    const pemesanan = {
      idGerai : this.gerai.id,
      namaGerai : this.gerai.namaGerai,
      user : this.gerai.user,
      tag,
      waktu,
      pesanan,
      jumlah,
      status,
      raw
    };
    this.firestore.collection('pesanan').add(pemesanan);
    this.alert.sukses('Pesanan telah ditambahkan :)', '1');
  
    }
    hitungPesanan() {
      return this.firestore.collection('pesanan', pesan => pesan.where('status', '==', false)).snapshotChanges();
    }
    gantiStatus(a) {
     this.firestore.collection('pesanan').get().toPromise().then((data) => {
       data.forEach( doc => {
         const pesanan = this.firestore.collection('pesanan').doc(doc.id);
         return pesanan.update({
           status: a
         });
       });
     }).catch(err => {
       console.log(err);
     });
  }
  getPesanan()  {
      return this.firestore.collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
  }
   setPenjualan(dateBegin, dateEnd)  {
    let begin = new Date(dateBegin);
    let end = new Date(dateEnd);
    let date1 = firebase.firestore.Timestamp.fromDate(dateBegin).toDate()
    let date2 = firebase.firestore.Timestamp.fromDate(dateEnd).toDate()
    let geraiData = this.firestore.collection('gerai').snapshotChanges();
    let menu = (id : string) => this.firestore.collection('gerai').doc(id).collection('menu').snapshotChanges()
    let pesanan = (id , begin,end) =>  this.firestore.collection('pesanan', pesan => pesan.where('idGerai', '==', id).where('waktu', '>', begin).where('waktu', '<', end)).get().toPromise()    
    geraiData.subscribe(res => {
        res.forEach(resGerai => {
          let idGerai = resGerai.payload.doc.id;
          let namaGerai = resGerai.payload.doc.data()['namaGerai']
          let pendapatan: number = 0;
          let transaksi: number = 0;
          const penjualan = []        
           menu(idGerai).subscribe(resMenu => {
             pesanan(idGerai, begin, end).then(resPesanan => {
              transaksi = resPesanan.docs.length;
              resMenu.forEach( itemMenu => {
                let terjual = 0;
                let namaPesanan = itemMenu.payload.doc.data().namaMenu;
                resPesanan.forEach(itemPesanan => {  
                  itemPesanan.data().pesanan.forEach(pesananData => {
                    if(itemMenu.payload.doc.data().namaMenu == pesananData.namaPesanan) {
                      pendapatan = pendapatan + (pesananData.hargaPesanan * pesananData.jumlahPesanan);
                      terjual = terjual + (pesananData.jumlahPesanan);
                    }
                  })
                });
                if(terjual > 0) {
                    penjualan.push({
                      namaMenu : namaPesanan,
                      terjual: terjual, 
                    })
                   }
                  })
                  this.setPenjualanFinal(pendapatan, transaksi, penjualan,dateBegin, dateEnd, idGerai,namaGerai)
                })
              })
    })
})
    
  }
  async setPenjualanFinal(pendapatan, transaksi, penjualan, date1, date2, id, nama){
    const penjualanGerai = {
      idGerai: id,
      namaGerai: nama,
      pendapatanGerai: pendapatan,
      penjualanGerai: penjualan,
      jumlahTransaksi: transaksi,
      startDate: date1,
      endDate: date2
    }
    console.log(penjualanGerai)
    // this.firestore.collection('penjualan').add(penjualanGerai);

  }
 
}
