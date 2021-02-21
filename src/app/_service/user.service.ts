import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';
import { AuthService } from './auth.service';
import { GeraiService } from './gerai.service';


@Injectable({ providedIn: 'root' })
export class UserService {
//    data: any;
    constructor(
            private http: HttpClient,
            private firestore: AngularFirestore,
            private auth: AuthService,
            private gerai: GeraiService
            ) {
                // console.log('oke')

       }
        settingUser() {
        //    let usr = await this.auth.user$.subscribe( val => {
        //        return val
        //    })
        //    let gerai = await this.gerai.ambilGerai();
        //    gerai.forEach(val => {
        //        console.log(gerai)
        //    })

       }

    getUser() {
        return this.firestore.collection('users').snapshotChanges();
    }

    // register(user: User) {
    //     return from(this.firestore.collection('users').add(user))

    // }

    // delete(id: number) {
    //     return this.http.delete(`users/${id}`);
    // }
}