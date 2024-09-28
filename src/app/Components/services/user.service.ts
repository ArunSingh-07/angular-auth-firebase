import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

interface UserData {
  username?: string; // Optional property
}

export interface User {
  uid: string;
  email: string | null;
  username?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  currentUser(): Observable<firebase.User | null> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.collection< UserData >('users').doc(user.uid).valueChanges().pipe(
            switchMap(userData => {
              // Return the original user with additional data from Firestore
              return of({
                ...user,
                username: userData?.username || '',
              });
            })
          );
        } else {
          return of(null);
        }
      })
    );
  }
}
