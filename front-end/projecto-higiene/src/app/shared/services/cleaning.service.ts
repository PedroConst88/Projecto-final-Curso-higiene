import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument, DocumentData, QuerySnapshot } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { toDate } from 'date-fns';
import { promises } from 'dns';
import { data } from 'jquery';
import { combineLatest, Observable, of, switchMap, map, from } from 'rxjs';
import { AuthService } from './auth.service';
import { Cleaning, User } from './user';

@Injectable({
  providedIn: 'root'
})
export class CleaningService {

  cleaning!: Observable<Cleaning[]>;
  workers!: Observable<User[]>;
  user!: User;
  cleaningTemp!: Observable<Cleaning[]>;

  constructor(public auth: AuthService, public afs: AngularFirestore, 
    public afAuth: AngularFireAuth, 
    public router: Router) {
    this.user = auth.userTemp;
  }


  //Retorna observable contendo marcações do utilizador conforme o role
  getCleaning(): Observable<Cleaning[]> {
    if (this.user.roles.client) {
      this.cleaningTemp = this.afs.collection<Cleaning>('cleaning', ref => ref.where('clientid', '==', this.user.uid)).valueChanges();
    } else if (this.user.roles.worker) {
      this.cleaningTemp = this.afs.collection<Cleaning>('cleaning', ref => ref.where('workerid', '==', this.user.uid)).valueChanges();
    }
    return this.cleaningTemp;
  }

  
  //Retorna collection coleção do users como promise para depois no component get número de trabalhadores
  async getWorkers(): Promise<any> {

    let itemsCollection = this.afs.collection<any>('users').valueChanges();
    let array: any[] = [];

    await new Promise((resolve, reject) => {
      itemsCollection.subscribe((response: any) => {
        response.forEach(async (worker: { uid: any; }) => {
          array.push(worker);
          console.log(worker.uid);
        })
        resolve(response);
      }, reject);
    });

    return await Promise.all(array);

  }

  //Recebe data e hora e verifica se existem marcações caso sim devolve como promise
  async checkAvailableTime(timeControl: string, currentTime: string): Promise<any> {
    let itemsCollection = this.afs.collection<Cleaning>('cleaning', ref => ref.where('dateClean', "==", timeControl).where("start", "==", currentTime)).valueChanges();

    let arrayall: any[] = [];
    return await new Promise((resolve, reject) => {
      itemsCollection.subscribe((response: any) => {
        arrayall.push(response);
        resolve(response);
      }, reject);
    });

  }

  //retorna coleção com data e hora recebida
  getWorkersOcupados(date: string, time: string): Observable<Cleaning[]> {
    return this.afs.collection<Cleaning>('cleaning', ref => ref.where('dateClean', "==", date).where("start", "==", time)).valueChanges();
  }

  //Guarda nova marcação na coleção cleaning do firestore
  async SaveCleaning(name: string, workerid: string, hid: string, dateAsDate: Date, dateClean: string, start: string, end: string, notes: string) {
    const cid = this.afs.createId();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `cleaning/${cid}`);
    const data: Cleaning = {
      cid: cid,
      clientid: this.user.uid,
      hid: hid,
      name: name,
      notes: notes,
      workerid: workerid,
      dateAsDate: dateAsDate,
      dateClean: dateClean,
      start: start,
      end: end,
    };
    return userRef.set(data, {
      merge: true,
    }).then(() => {
      window.location.reload();
    });
  }
}
