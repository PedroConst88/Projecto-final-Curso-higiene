import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/layout/nav-bar/nav-bar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { IntroComponent } from './components/views/intro/intro.component';
import { LoginComponent } from './components/views/login/login.component';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthService } from "./shared/services/auth.service";
import { ForgotPassComponent } from './components/views/forgot-pass/forgot-pass.component';
import { DashboardComponent } from './components/views/dashboard/dashboard.component';
import { VerifyEmailComponent } from './components/views/verify-email/verify-email.component';
import { RegisterComponent } from './components/views/register/register.component';
import { RegisterWorkersComponent } from './components/views/register-workers/register-workers.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    IntroComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    DashboardComponent,
    VerifyEmailComponent,
    RegisterWorkersComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
