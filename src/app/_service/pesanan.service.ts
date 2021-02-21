import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { AlertService } from 'd/app/_service/alert.service';
import { AuthService } from './auth.service';
import { GeraiService } from './gerai.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Pesanan } from 'd/app/_model/pesanan.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PesananService {
  data;
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
       let b = a.payload.doc.data()['user'];
       if (b == usr.email ) {
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
  addPesanan(index, jumlah, pesan) {
    const waktu = new Date(Date.now());
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
      namaGerai : this.gerai.profile.namaGerai,
      user : this.gerai.profile.user,
      tag,
      waktu,
      pesanan,
      jumlah,
      status,
      raw
    };
    this.firestore.collection('gerai').doc(this.gerai.id).collection('pesanan').add(pemesanan);
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
    return this.firestore.collection('gerai').doc(this.gerai.id).collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
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
    pesanan() : Observable<Pesanan[]> {
    const dataPesanan = [];
    const pesanan = this.firestore.collection('gerai').snapshotChanges().pipe(
     map(psn => {
        psn.map(item => {
         this.firestore.collection('gerai').doc(item.payload.doc.id).collection('penjualan', pesan => pesan.orderBy('waktu', 'desc')).valueChanges().subscribe(itmPsn=> {
             dataPesanan.push(...itmPsn);
         });
       });
       psn.map(item => {
         this.firestore.collection('gerai').doc(item.payload.doc.id).collection('pesanan',  pesan => pesan.orderBy('waktu', 'desc')).valueChanges().subscribe(itmPjl=> {
             dataPesanan.push(...itmPjl);
         }); 
       });
       return dataPesanan;
     }) 
    )
    return pesanan
     
  }  
}
