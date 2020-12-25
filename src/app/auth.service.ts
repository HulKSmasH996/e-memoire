import { Injectable } from '@angular/core';
import { User } from './model/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  calendarItems: any[];
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.initClient();

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    );
  }

  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');

      gapi.client.init({
        apiKey: 'AIzaSyDm-NDiS5UIi2A0YVwiTH3mrtonl-Qep-w',
        clientId:
          '306901841082-v8u3mhnlnk45o4tpuj2enbcm4a7vn8o1.apps.googleusercontent.com',
        dicoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      // gapi.client.loaded('calendar', 'v3', () => {
      //   console.log('calendar loaded');
      // });
    });
  }

  async googleSignin() {
    // const provider = new firebase.auth.GoogleAuthProvider();
    // const credential = await this.afAuth.signInWithPopup(provider);
    // this.router.navigate(['tasks']);
    // return this.updateUserData(credential.user);

    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    //const gapiUser = googleUser.getBasicProfile();
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    const afauthusr = await this.afAuth.signInAndRetrieveDataWithCredential(
      credential
    );
    this.user$ = of(afauthusr.user);
    // const AuthUserGapi = {
    //   uid: gapiUser.getId(),
    //   email: gapiUser.getEmail(),
    //   displayName: gapiUser.getName(),
    //   photoURL: gapiUser.getImageUrl(),
    // };
    this.router.navigate(['tasks']);
    return this.updateUserData(afauthusr.user);
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }

  async signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut();
    await this.afAuth.signOut();
    this.router.navigate(['/']);
  }
}
