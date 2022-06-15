import { Injectable, NgZone } from '@angular/core';
import { Houses, User } from '../services/user';
import * as auth from 'firebase/auth';
import {BehaviorSubject, defer, from, Observable, of, ReplaySubject} from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ResolveStart, Router } from '@angular/router';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$!: Observable<User | null | undefined>;
  dataPromise!: Promise<User>;


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    this.user$ =  this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        return from(this.afs.doc<User>(`users/${user.uid}`).valueChanges());
      } else {
        return of(null);
      }
    }));

    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */

/*    this.user$ = this.afAuth.authState.pipe(switchMap((user) => {
      if (user) {
        const tempUser = defer(() => this.getUser(user)) as Observable<User | null | undefined>
        tempUser.pipe(switchMap((user) => {
          user?.roles
        }));
        return tempUser;
      } else {
        return of(null);
      }
    }));
    console.log('AQUI --------> ')*/
  }

  async getUser(user: any): Promise<User | void> {
    const docData = await this.afs.doc<User>(`users/${user.uid}`).get().toPromise()
    .then((res) => {
      return res?.data() as unknown as Promise<User>;
    }).catch(err => {
      console.log('something went wrong '+ err)
    });
    return docData;
  }



  // Sign in with email/password
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Sign up with email/password
  SignUpUser(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  SignUpWorker(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        this.SendVerificationMail();
        this.SetWorkerData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  // Returns true when user is looged in and email is verified


  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {admin:false, client: true, worker:false },
    };
    return userRef.set(data, {
      merge: true,
    });
  }

  SetWorkerData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: {admin:false, client: false, worker: true },
    };
    return userRef.set(data, {
      merge: true,
    });
  }
  async SetData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      roles: user.roles,
    };
    return userRef.set(data, {
      merge: true,
    });
  }

 

  // determines if user has matching role
  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) {
      return false;
    }
    for (const role of allowedRoles){
    }
    return false
  }

  canAddWorkers(user: User): boolean {
    const allowed = ['admin'];
    return this.checkAuthorization(user, allowed);
  }


  getHouses() : Observable<Houses[]>{
    return this.user$.pipe(map((user:any)=>{
      console.log(user?.uid);
      return user?.houses;
    }));
  }


  saveImage(){
    
  }

  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['login']);
  }

}
/**      if(user){
        this.userData = this.afs.doc(`users/${user.uid}/${user.houses}`).valueChanges();
      }else{
        this.userData = of(null);
      }});
      
      */