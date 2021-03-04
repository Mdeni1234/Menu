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

  tambahGerai(value: Gerai, userData) {
    let namaGerai = value.namaGerai;
    let jamBuka = value.jamBuka;
    let jamTutup = value.jamTutup;
    const gerai = {
      namaGerai,
      jamBuka,
      jamTutup,
      user : {
        email: userData.email,
        uid: userData.uid
      }
    }
    this.firestore.collection('gerai').add(gerai);
    this.firestore.collection('users').doc(userData.uid).update({gerai:true});
  }
  ambilGerai() {
    return this.firestore.collection('gerai').snapshotChanges();
  }
  updateGerai(value: any, oldUserId: any, userData:any) {
    let namaGerai = value.namaGerai;
    let jamBuka = value.jamBuka;
    let jamTutup = value.jamTutup;
    const gerai = {
      namaGerai,
      jamBuka,
      jamTutup,
      user : {
      email: userData.email,
      uid: userData.uid
      }
    }
    this.firestore.collection('gerai').doc(value.id).update(gerai);
    this.firestore.collection('users').doc(userData.uid).update({gerai:true});
    if (gerai.user != oldUserId ) {
      this.firestore.collection('users').doc(oldUserId).update({gerai: false});
    }
  }
  deleteGerai(geraiId: string) {
    this.firestore.collection('gerai').doc(geraiId).delete()
  }
  ambilUsers() {
      return this.firestore.collection('users').snapshotChanges();
  }
}
