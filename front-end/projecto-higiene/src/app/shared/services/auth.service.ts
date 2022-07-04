import { Injectable, NgZone } from '@angular/core';
import { Cleaning, Houses, User } from '../services/user';
import * as auth from 'firebase/auth';
import { BehaviorSubject, combineLatest, defer, forkJoin, from, Observable, of, ReplaySubject } from "rxjs";
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { ResolveStart, Router } from '@angular/router';
import { delay, map, switchMap, take } from 'rxjs/operators';
import { share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user$!: Observable<User | null | undefined>;
  dataPromise!: Promise<User>;
  userTemp!: User;
  app:any;


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {

    //get user data from firestore conforme id após autenticação no authentication firebase
    this.user$ = this.afAuth.authState.pipe(switchMap((user) => {
      console.log(user?.uid)
      return this.getUser(user).then(docArr => {
        return docArr;
      });
    }));

    this.user$.subscribe(user => {
      if (user)
        this.userTemp=user;
    })
  }


  // get user devolve user na firestore as promise
  async getUser(user: any): Promise<any> {
    let itemsCollection = this.afs.doc<User>(`users/${user.uid}`).valueChanges();
    return await new Promise((resolve, reject) => {
      itemsCollection.subscribe((response: any) => {
        resolve(response);
      }, reject);
    });
  }


  // login
  SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.ngZone.run(() => {
            this.router.navigate(['dashboard'])
        });
        this.SetData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // criar registo para cliente
  SignUpUser(email: string, password: string, nome: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(async (result) => {
        //adicionar nome ao authentication firebase
        await result.user?.updateProfile({displayName: nome}).then(function() {
        }, function(error) {
        });
        this.SendVerificationMail();
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
  // criar registo para worker
  SignUpWorker(email: string, password: string, nome: string) {
    if(!this.app){
      this.app=firebase.initializeApp(environment.firebaseConfig,'secondary');
    }
    this.app.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (result:any) => {
        /* Call the SendVerificaitonMail() function when new user sign 
        up and returns promise */
        await result.user?.updateProfile({displayName: nome}).then(function() {
          // Profile updated successfully!
          // "Jane Q. User", hasn't changed.
        }, function() {
          // An error happened.
        });
        await this.SetWorkerData(result.user);
      })
      .catch((error: { message: any; }) => {
        window.alert(error.message);
      });
  }
  // enviar email confirmação após criar conta
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Resetar password
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

  // guardar dados de cliente na firestore client
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
      roles: { admin: false, client: true, worker: false },
    };
    return userRef.set(data, {
      merge: true,
    })
  }
  // guardar dados de worker na firestore client
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
      roles: { admin: false, client: false, worker: true },
    };
    return userRef.set(data, {
      merge: true,
    }).then(()=>{
      window.location.reload();
    });
  }
  // guardar dados de sign in no firestore
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
    })
  }

  // deletar trabalhador caso exista
  deleteWorker(workerId: string) {
    this.afs.doc(`users/${workerId}`).delete().then(() => {
      console.log("Document successfully deleted!");
    }).then(()=>{
      window.location.reload();
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  // deletar marcação caso exista
  deleteMarc(cleanId: string){
    this.afs.doc(`cleaning/${cleanId}`).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  // return observable contendo todas as marcações da coleção cleaning
  getCleaningAdmin(): Observable<Cleaning[]>{
    return this.afs.collection<Cleaning>(`cleaning`).valueChanges();
  }

  // return observable contendo todos users da coleção users
  getWorkersAdmin(): Observable<User[]> {
    return this.afs.collection<User>(`users`).valueChanges();
  }


  // Sign out
  async SignOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['login']).then(()=>{
      window.location.reload();
    });
  }

}