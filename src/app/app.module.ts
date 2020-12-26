import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  NgbPaginationModule,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './sign-in-component/sign-in-component.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { AboutComponent } from './about/about.component';
import { TaskdashboardComponent } from './taskdashboard/taskdashboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const firebaseConfig = {
  apiKey: 'AIzaSyDm-NDiS5UIi2A0YVwiTH3mrtonl-Qep-w',
  authDomain: 'e-resume-f9ea0.firebaseapp.com',
  projectId: 'e-resume-f9ea0',
  storageBucket: 'e-resume-f9ea0.appspot.com',
  messagingSenderId: '814788778570',
  appId: '1:814788778570:web:2706c434e7c9fec3aa64b3',
  measurementId: 'G-X4HDMET7DB',
};

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    SignInComponent,
    AboutComponent,
    TaskdashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
    //HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
