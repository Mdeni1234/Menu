import { Injectable} from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import  * as firebase from 'firebase/app';
import { User } from '../_model/user.model';
import 'firebase/firestore';
import 'firebase/auth';
import { Observable, of, BehaviorSubject, config } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FirebaseDatabase } from '@angular/fire';
import { AngularFireDatabase } from '@angular/fire/database';
import { take, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { userGerai } from '../_model/userGerai.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
    user$: Observable<User>;
    gerai$: Observable<any>;
  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router
              ) {
                this.user$ = this.afAuth.authState
                .pipe(switchMap(user => {
                  if (user) {
                    return this.afs.collection('users').doc(user.uid).valueChanges()
                  } else {
                    return of(null)
                  }
                }))
                this.gerai$ = this.afAuth.authState
                .pipe(switchMap(user => {
                  if (user) {
                    return this.afs.collection('gerai', gerai => gerai.where('user.uid', '==', user.uid)).get()
                  } else {
                    return of(null)
                  }
                }))
                this.afAuth.authState.subscribe(res => {
                  if (res && res.uid) {
                    console.log('login')
                  } else {
                  this.user$.subscribe(a=> console.log(a))
                    console.log('not login')
                    return this.signOut()
                  }
                });
 
             
  }
  checkSignIn(){
    this.afAuth.authState.subscribe(res => {
      if (res && res.uid) {
        console.log('login')
        return this.signOut()
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
    return firebase.auth().signOut().then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log(error)

    });
    
  }

  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const before = this.afs.collection('users', users => users.where('email', '==', user.email)).get()
    const users = this.afs.collection('users')
    users.get().subscribe( res => {
      if(res.empty) {
        const data: User = {
          uid: user.uid,
          email: user.email,
          gerai: false,
          roles: {
            owner: true
          }
        }
        this.router.navigate(['/penjualan']);
        return userRef.set(data, { merge: true })
      } else {
        const data: User = {
          uid: user.uid,
          email: user.email,
          gerai: false,
          roles: {
            kasir: true
          }
        }
        this.router.navigate(['/menu']);
        before.subscribe(res => {
          if(res.empty) {
            return userRef.set(data, { merge: true })
          }
        })
      }
    })
   
    
  }
  isGerai(user: User): boolean {
    console.log
    const allowed = ['kasir']
    return this.checkGeraiAuthorization(user, allowed)
  }
  isUser(user: User): boolean {
    const allowed = ['kasir']
    return this.checkAuthorization(user, allowed)
  }
  
  isAdmin(user: User): boolean {
    const allowed = ['owner']
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
