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
              private router: Router) {
      // Get auth data, then get firestore user document || null
      this.user$ = this.afAuth.authState
        .pipe(switchMap(user => {
          if (user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
          } else {
            return of(null)
          }
        }))
      // this.afAuth.authState.subscribe(user => {
      //   if (user) {
      //     this.userData = user; // Setting up user data in userData var
      //     localStorage.setItem('user', JSON.stringify(this.userData));
      //     JSON.parse(localStorage.getItem('user'));
      //   } else {
      //     localStorage.setItem('user', null);
      //     JSON.parse(localStorage.getItem('user'));
      //   }
      // })
  }


    ///// Login/Signup //////

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
    this.afAuth.auth.signOut()
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      roles: {
        user: true
      }
    }
    this.router.navigate(['/']);
    return userRef.set(data, { merge: true })
  }

  canRead(user: User): boolean {
    const allowed = ['admin', 'user']
    return this.checkAuthorization(user, allowed)
  }
  
  canEdit(user: User): boolean {
    const allowed = ['admin']
    return this.checkAuthorization(user, allowed)
  }
  
  
  
  
  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if ( user.roles[role] == true ) {
          console.log()
        return true
      }
    }
    return false
  }
  
}
