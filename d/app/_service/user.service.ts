import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { from } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient,
      private firestore: AngularFirestore) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        // return this.http.post('/users/register', user);
        return from(this.firestore.collection('users').add(user))

    }

    delete(id: number) {
        return this.http.delete(`users/${id}`);
    }
}