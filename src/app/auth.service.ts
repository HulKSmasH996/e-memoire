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
//import { HttpClient } from '@angular/common/http';

declare var gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  calendarItems: any[];
  constructor(
    // private http: HttpClient,
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
          '814788778570-n2bpgvbop3mtu6humnb0ot0a1t5efdms.apps.googleusercontent.com',
        dicoveryDocs: [
          'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest',
        ],
        scope: 'https://www.googleapis.com/auth/calendar',
      });

      gapi.client.load('calendar', 'v3', () => {
        console.log('calendar loaded');
      });
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
    //console.log(this.getCalendar());
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

  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });

    console.log(events);
    this.calendarItems = events.result.items;
    console.log(this.calendarItems);
  }
  async deleteEvent() {
    await gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: '6ie29736l71a8kgevl51p1b003',
    });
    await this.getCalendar();
  }
  async insertEvent() {
    //console.log(hoursFromNow(4));
    await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      end: {
        dateTime: hoursFromNow(0.45).toString(),
        timeZone: 'Asia/Kolkata',
      },
      start: {
        dateTime: hoursFromNow(0.25).toString(),
        timeZone: 'Asia/Kolkata',
      },
      summary: 'Have Fun',
      description: 'Do something cool',
    });
    await this.getCalendar();
  }
}
const hoursFromNow = (n) =>
  new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
