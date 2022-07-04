import { Injectable, NgZone } from '@angular/core';
import { map, Observable, of, switchMap } from 'rxjs';
import { Houses, User } from './user';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  houses: Observable<Houses[]> | undefined;
  userid!: string;
  loadedHouse!: Houses;

  constructor(public auth: AuthService, public afs: AngularFirestore,
    public afAuth: AngularFireAuth, 
    public router: Router,public ngZone: NgZone) {
      
      this.userid=auth.userTemp.uid;

  }

  //return casas associadas ao cliente
  getHousesList(): Observable<Houses[]> {
    return this.afs.collection<Houses>(`houses`, ref => ref.where('owner', '==', this.userid)).valueChanges();
  }

  //return dos dados da casa selecionada para editar
  loadHouse(houses: Houses){
    this.loadedHouse=houses;
    return this.router.navigate(['add-house']);
  }

  //guardar casa caso não exista registo da mesma caso contrário atualiza os dados alterados
  storeHouse(name: string, size: number, address: string, city: string, zip: number, numRoom: number, numBath: number, numKitchen: number, numGarden: number, numLiving: number, numDining: number, numGarage: number){
    if(this.loadedHouse.hid==''){
      this.SaveHouse(name, size, address, city, zip, numRoom, numBath, numKitchen, numGarden, numLiving, numDining, numGarage);
    }else{
      this.UpdateHouse(name, size, address, city, zip, numRoom, numBath, numKitchen, numGarden, numLiving, numDining, numGarage);
    }
  }

  //atualiza casa acede ao documento da casa alterada e atualiza os dados
  UpdateHouse(name: string, size: number, address: string, city: string, zip: number, numRoom: number, numBath: number, numKitchen: number, numGarden: number, numLiving: number, numDining: number, numGarage: number) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `houses/${this.loadedHouse.hid}`);

    const data: Houses = {
      owner: this.userid,
      hid: this.loadedHouse.hid,
      name: name,
      address: address,
      postcode: zip,
      city: city,
      size: size,
      numRoom: numRoom,
      numBath: numBath,
      numKitchen: numKitchen,
      numGarden: numGarden,
      numLiving: numLiving,
      numDining: numDining,
      numGarage: numGarage,
    };
    this.router.navigate(['profile']);
    return userRef.update(data);
  }


  //guarda nova casa conforme os dados inseridos
  SaveHouse(name: string, size: number, address: string, city: string, zip: number, numRoom: number, numBath: number, numKitchen: number, numGarden: number, numLiving: number, numDining: number, numGarage: number) {
    const id = this.afs.createId();
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `houses/${id}`);
    const data: Houses = {
      owner: this.userid,
      hid: id,
      name: name,
      address: address,
      postcode: zip,
      city: city,
      size: size,
      numRoom: numRoom,
      numBath: numBath,
      numKitchen: numKitchen,
      numGarden: numGarden,
      numLiving: numLiving,
      numDining: numDining,
      numGarage: numGarage,
    };
    this.router.navigate(['profile']);
    return userRef.set(data, {
      merge: true,
    });
    
  }

  //se casa com o id recebido existir esta elimina a casa
  deleteHouse(hid:string){
    this.afs.doc(`houses/${hid}`).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

}
