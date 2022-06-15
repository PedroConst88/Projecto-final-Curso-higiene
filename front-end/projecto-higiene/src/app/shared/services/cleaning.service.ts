import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from './auth.service';
import { Cleaning } from './user';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  cleaning: Observable<Cleaning[]> | undefined;
  userid!: string;

  constructor(auth: AuthService, public afs: AngularFirestore, // Inject Firestore service
  public afAuth: AngularFireAuth, // Inject Firebase auth service
  public router: Router) {
    auth.user$.subscribe(user => {
      if (user) this.userid = user.uid
    })
   }

   getCleaningList(): Observable<Cleaning[]> {
    return this.afs.collection<Cleaning>(`cleaning`).valueChanges()
  }

  getCleaning(): Observable<any> {
    return this.afs.collection<Cleaning>('cleaning', ref => ref.where('clientid', '==', this.userid)).valueChanges();
 }


  async SaveCleaning(name: string, start: Date,end: Date, notes: string) {
    const cid = this.afs.createId();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `cleaning/${cid}`);
    const data: Cleaning = {
      cid: cid,
      clientid: this.userid,
      name: name,
      notes:notes,
      workerid:'12314354',
      start: start,
      end: end,
    };
    this.router.navigate(['dashboard']);
    return userRef.set(data, {
      merge: true,
    });
    
  }
}
