// import { Injectable } from '@angular/core';
// import { AlertService } from './alert.service';
// import { Menu } from '../_model/menu.model';
// import { formatDate } from '@angular/common';
// import { AngularFirestore } from '@angular/fire/firestore';
// import * as firebase from 'firebase/app';
// import { MatDialog } from '@angular/material';
// import { HasilPenjualanComponent } from '../list-pesanan/hasil-penjualan/hasil-penjualan.component';
// import { MenuService } from './menu.service';


// @Injectable({
//   providedIn: 'root'
// })
// export class JadwalService {
//   // tslint:disable-next-line: triple-equals
//   formData: Menu;
//   waktuKemarin: Date = ( hari => new Date(hari.setDate(hari.getDate() - 1  )))(new Date);
//   waktuHariIni: Date = new Date();
//   jamSekarang = this.waktuHariIni.getHours();
//   format = 'dd/MM/yyyy';
//   locale = 'en-US';
//   tglKemarin = formatDate(this.waktuKemarin, this.format, this.locale);
//   tglSekarang = formatDate(this.waktuHariIni, this.format, this.locale);
//   penjadwalan;
//   prepareJadwal;
//   cekAntrian;


//   constructor(
//     private alert: AlertService,
//     private firestore: AngularFirestore,
//     public dialog: MatDialog,
//     private menuService: MenuService,
//   ) { }
//  jadwal() {
//   this.prepareJadwal =
//   setInterval( () => {
//       if (this.jamSekarang == 1) {
//         this.Penjualan();
//     }

//   }, 100000);
//  }
//    antrian() {
//      console.log(this.penjadwalan.antrian);
//   //    this.cekAntrian = setInterval(  () => {
//   //     const hitungAntrian = (this.penjadwalan.antrian - 0) + 1;
//   //     if (this.penjadwalan.antrian > 12) {
//   //       this.updateAntrian();
//   //       this.Penjualan();
//   //     } else {
//   //       const antrian = {
//   //         antrian : hitungAntrian,
//   //         logTerakhir : this.waktuHariIni
//   //       };
//   //       this.firestore.doc('penjadwalan/' + this.penjadwalan.id).update(antrian);
//   //       this.getJadwal();
//   //     }
//   //     console.log(hitungAntrian);
//   // }, 1000000);
//      this.cekAntrian = setInterval(() => {
//     if (this.penjadwalan.logTerakhir > this.penjadwalan.hariEksekusi) {
//       console.log(this.penjadwalan.logTerakhir);
//       this.Penjualan();
//     }
//   }, 1000);
//   }
//    cekLogTerakhir() {
//     const a = ( hari => new Date(hari.setDate(hari.getDate() + 1  )))(new Date);
//     const logTerakhir = this.penjadwalan.logTerakhir.toDate();
//     const cekWaktu: Date = ( hari => new Date(hari.setHours(hari.getHours() - this.penjadwalan.logTerakhir.toDate().getHours()))) (new Date);

//     console.log(logTerakhir.getHours(), this.waktuHariIni.getHours());
//     if (logTerakhir.getHours() < this.waktuHariIni.getHours()) {
//       const jumlahAntrian = {
//         antrian : (cekWaktu.getHours() - 0) + this.penjadwalan.antrian,
//         logTerakhir : this.waktuHariIni
//       };
//       // this.firestore.doc('penjadwalan/' + this.penjadwalan.id).update(jumlahAntrian);
//       this.getJadwal();
//       }
//     console.log(a.toLocaleDateString() >  this.waktuHariIni.toLocaleDateString());

//     }
//    async getJadwal() {
//      await this.firestore.collection('penjadwalan').ref.get().then((doc) => {
//       return doc.docs.map( d => {
//             this.penjadwalan = {
//               id:  d.id,
//               ...d.data()
//             };
//           });
//     });
//   }
//    async pilihMetode() {
//     await this.getJadwal();
//     this.cekLogTerakhir();
//     if (this.penjadwalan.statusJadwal === true) {
//           this.jadwal();
//        } else {
//           this.antrian();
//        }

//   }
// updateStatusJadwal() {
//     const status = {
//       statusJadwal : false
//     };
//     return this.firestore.doc('penjadwalan/' + this.penjadwalan.id).update(status);
//   }
// updateAntrian() {
//     const hitungAntrian = (this.penjadwalan.antrian - 0) - 24;
//     const antrian = {
//       antrian : hitungAntrian,
//       logTerakhir : this.waktuHariIni
//     };
//     //  this.firestore.doc('penjadwalan/' + this.penjadwalan.id).update(antrian);
//     //  this.getJadwal()
//   }

//   async Penjualan() {
//   clearInterval(this.prepareJadwal);
//   if (this.penjadwalan.statusJadwal === true) {
//    this.updateStatusJadwal();
//   }
//   let jumlahPendapatan = 0;
//   let jumlahPesanan = 0;
//   let namaPesanan: string;
//   let cekWaktuPesanan: any;
//   const tag = 2;
//   let menu = [];
//   const kalkulasiPenjualanHariIni = [];
//   let jumlahTransaksi = 0;
//   let jumlahPenjualanHariIni = 1;
//   let hasilPenjualanHariIni = 0;
//   this.menuService.getMenu().subscribe( item => {
//     menu = item.map( d => {
//       return {
//         ...d.payload.doc.data() as Menu
//       };
//     });
//   });
//   const data = await this.firestore.collection('pesanan').get().toPromise();
//   // tslint:disable-next-line: prefer-for-of
//   for (let t = 0; t < menu.length; t++) {
//     data.forEach(doc => {
//       let indexPesanan = 0; let TransaksiPerPesanan = 0;
//       cekWaktuPesanan = formatDate(doc.data().waktu.toDate(), this.format, this.locale);
//       if (cekWaktuPesanan == this.tglKemarin) {
//         if (menu[t].namaMenu == doc.data().pesanan[indexPesanan].namaPesanan) {
//           jumlahTransaksi++;
//           jumlahPendapatan = jumlahPendapatan + (doc.data().jumlah - 0);
//           namaPesanan = doc.data().pesanan[indexPesanan].namaPesanan;
//           jumlahPesanan = jumlahPesanan + doc.data().pesanan[indexPesanan].jumlahPesanan;
//           TransaksiPerPesanan++;
//           hasilPenjualanHariIni = hasilPenjualanHariIni + TransaksiPerPesanan;
//         }
//       }
//       indexPesanan++;
//     });
//     if (jumlahPenjualanHariIni <= hasilPenjualanHariIni) {
//       jumlahPenjualanHariIni++;
//       kalkulasiPenjualanHariIni.push({
//         terjual: jumlahPesanan,
//         namaPesanan
//       });
//     }
//   }
//   const penjualan = {
//     waktu: new Date(Date.now()),
//     tag,
//     penjualan: kalkulasiPenjualanHariIni,
//     jumlahPenjualan: jumlahTransaksi,
//     hasilPenjualan: jumlahPendapatan,
//   };
//   // this.firestore.collection('penjualan').add(penjualan);
//   // const dialogRef = this.dialog.open(HasilPenjualanComponent, {
//   //   width: '80%',
//   //   data: penjualan
//   // });

// }
// }
