import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  * as firebase from 'firebase/app';
import { User } from '../_model/user';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, of, BehaviorSubject, config } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    user$: Observable<User>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router
              ) {
                this.user$ = this.afAuth.authState
                .pipe(switchMap(user => {
                  if (user) {
                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
                  } else {
                    return of(null)
                  }
                }))
 
              this.afAuth.authState.subscribe(res => {
                if (res && res.uid) {
                  console.log('user is logged in');
                } else {
                  console.log(res);
                }
              });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }
 
  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {
    firebase.auth().signOut().then(() => {
    }).catch((error) => {
      console.log('asdasd '+ error)

    });
    
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      gerai: false,
      roles: {
        user: true
      }
    }
    this.router.navigate(['/']);
    return userRef.set(data, { merge: true })
  }
  isGerai(user: User): boolean {
    const allowed = ['user']
    return this.checkGeraiAuthorization(user, allowed)
  }
  isUser(user: User): boolean {
    const allowed = ['user']
    return this.checkAuthorization(user, allowed)
  }
  
  isAdmin(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
  
  private checkGeraiAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] == true ) {
        if(user.gerai) {
          return true
        } else {
          return false
        }
      }
    }
    return false
  }
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] == true ) {
          return true
      }
    }
    return false
  }
}
