import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/';
import { AlertService } from '../_service/alert.service';
import { AuthService } from './auth.service';
import { GeraiService } from './gerai.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Pesanan } from '../_model/pesanan.model';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';



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
    console.log(this.gerai.id)

    // return this.firestore.collection('gerai').doc(this.gerai.id).collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
    return this.firestore.collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();

  }
  getPenjualan(dateBegin, dateEnd)  {
  let waktuKemarin: Date = ( hari => new Date(hari.setDate(hari.getDate() - 1  )))(new Date);
  let now:  Date = ( hari => new Date(hari.setDate(hari.getDate() + 1  )))(new Date);
  let jamSekarang = now.getHours();
  let format = 'dd/MM/yyyy';
  let locale = 'en-US';
  let tglKemarin = formatDate(waktuKemarin, format, locale);
  let tglSekarang = formatDate(now, format, locale);
  let formatdate= (date) => formatDate(date, format, locale);
  
    // return this.firestore.collection('penjualan', pesan => pesan.orderBy('waktu', 'desc')).snapshotChanges();
    const refA = firebase.firestore().collection('pesanan');
    // const refB = this.firestore.collection('pesanan', pesan => pesan.orderBy('waktu', 'desc')).get().toPromise();
    // return this.firestore.collection('pesanan', pesan => pesan.orderBy('waktu', 'asc')).get().toPromise()
    // .then(data => {
    //   let fireDate = new Date(data.docs[0].data().waktu.toDate()) ;
    //   for(let date = fireDate; fireDate <= now; date.setDate(date.getDate() +1)) {
    //    data.forEach(doc => {
    //     if(formatdate(doc.data().waktu.toDate()) == formatdate(date)) {

    //     }
    //    })
    //   }

    // })

    // return this.geraiService.ambilGerai().subscribe( gerai => {
    //   gerai.forEach( item => {
    //    let a =item.payload.doc.data();
    //     return console.log(JSON.stringify(a))
    //   });
    //   });
   
    let begin = new Date(dateBegin.setDate(dateBegin.getDate() - 1  ));
    let end = new Date(dateEnd.setDate(dateEnd.getDate() + 1  ));
    let date1 = firebase.firestore.Timestamp.fromDate(dateBegin).toDate()
    let date2 = firebase.firestore.Timestamp.fromDate(dateEnd).toDate()
    let jumlahPendapatan = 0;
    let cekWaktuPesanan: any;
    const tag = 2;
    let dataMenu = [];
    const kalkulasiPenjualanHariIni = [];
    let jumlahTransaksi = 0;
    


    let hasilPenjualanHariIni = 0;
    let waktuPesanan
    let ab = 1
    let geraiData = this.firestore.collection('gerai').snapshotChanges();
    let menu = (id : string) => this.firestore.collection('gerai').doc(id).collection('menu').snapshotChanges()
    let pesanan = (id , begin,end) =>  this.firestore.collection('pesanan', pesan => pesan.where('idGerai', '==', id).where('waktu', '>=', begin).where('waktu', '<=', end)).get().toPromise()    
    geraiData.subscribe(res => {
        res.forEach(resGerai => {
          let idGerai = resGerai.payload.doc.id;
          let namaGerai = resGerai.payload.doc.data()['namaGerai']
          let pendapatan: number = 0;
          let transaksi: number = 0;
          const penjualan = []
          menu(idGerai).subscribe(resMenu => {
            pesanan(idGerai, date1, date2).then(resPesanan => {
              transaksi = resPesanan.docs.length;
              resMenu.forEach( itemMenu => {
                let terjual = 0;
                let namaPesanan = itemMenu.payload.doc.data().namaMenu;
                resPesanan.forEach(itemPesanan => {  
                  itemPesanan.data().pesanan.forEach(pesananData => {
                    if(itemMenu.payload.doc.data().namaMenu == pesananData.namaPesanan) {
                      pendapatan = pendapatan + (itemPesanan.data().jumlah - 0);
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
         })
      
        })
        console.log(pendapatan, transaksi)

        const penjualanGerai = {
          idGerai: idGerai,
          namaGerai: namaGerai,
          pendapatanGerai: pendapatan,
          penjualanGerai: penjualan,
          jumlahTransaksi: transaksi,
          startDate: date1,
          endDate: date2
        }
        console.log(penjualanGerai)
    })
})
    //
   
      // return this.firestore.collection('gerai').get().toPromise()
      // .then( rawData => {
      //   rawData.forEach(gerai => {
      //     this.firestore.collection('gerai').doc(gerai.id).collection('menu').get().toPromise()
      //     .then(menu => {
      //       this.firestore.collection('pesanan').get().toPromise()
      //       .then(pesanan => {
      //         menu.forEach(menuItem => {
      //           pesanan.forEach(pesananItem => {
      //             if(gerai.id === pesananItem.id && menuItem.data().namaMenu === pesananItem.data().namaMenu) {
      //                console.log('dada')
      //             }
      //           })
      //         })           
      //       })
              
      //     })
      //   })
      // })
    
    // return Promise.all([
    //  refA.get(),
    //  refB.get()
    // ]).then(promiseResults => {
    //     const mergedData = [];
    //     promiseResults.forEach( snapshot => {
    //         snapshot.forEach( doc => mergedData.push(doc.data()) );
    //     });
    //     return mergedData;
    //   }).then(mergedData => mergedData.sort((a, b) => b.waktu.toDate() - a.waktu.toDate())).then(sortedData => {
    //     return sortedData;
    //   }).catch(e => console.error(e));
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
