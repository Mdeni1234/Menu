import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material';
import { Gerai } from '../_model/gerai.model';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class GeraiService {

  constructor(
    private alert: AlertService,
    private firestore: AngularFirestore,
    private dialog: MatDialog
  ) { }

  tambahGerai(value: Gerai) {
    let namaGerai = value.namaGerai;
    let jamBuka = value.jamBuka;
    let jamTutup = value.jamTutup;
    let user = value.users;
    const gerai = {
      namaGerai,
      jamBuka,
      jamTutup,
      user
    }
    this.firestore.collection('gerai').add(gerai);
  }
  ambilGerai() {
    return this.firestore.collection('gerai').snapshotChanges();
  }
  updateGerai(gerai: any) {
    this.firestore.doc('gerai/' + gerai.id).update(gerai);
  }
  hapusGerai(geraiId: string) {
    this.firestore.doc('gerai' + geraiId).delete()
  }
  ambilUsers() {
      return this.firestore.collection('users').snapshotChanges();
  }
}
