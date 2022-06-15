import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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
import { ProfileComponent } from './components/views/profile/profile.component';
import { AddHousesComponent } from './components/views/add-houses/add-houses.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AdminGuard } from './shared/guard/admin.guard';
import { ListHousesComponent } from './components/views/list-houses/list-houses.component';
import { CardHousesComponent } from './components/layout/card-houses/card-houses.component';
import {MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CleaningService } from './shared/services/cleaning.service';
import { HouseService } from './shared/services/house.service';
import { AddCleaningComponent } from './components/layout/add-cleaning/add-cleaning.component';


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
    ProfileComponent,
    AddHousesComponent,
    ListHousesComponent,
    CardHousesComponent,
    AddCleaningComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    FormsModule,
    NgbModalModule,
    BrowserAnimationsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    NgbModule,
  ],
  providers: [
    DatePipe,
    AuthService,
    AuthGuard,
    CleaningService,
    AuthService,
    HouseService,
    AdminGuard
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
