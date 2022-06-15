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

  constructor(auth: AuthService, public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,public ngZone: NgZone) {
      
    auth.user$.subscribe(user => {
      if (user)
        this.userid = user.uid
    })

  }

  getHousesList(): Observable<Houses[]> {
    console.log('GET HOUSE '+this.userid)
    return this.afs.collection<Houses>(`houses`, ref => ref.where('owner', '==', this.userid)).valueChanges();
  }

  loadHouse(houses: Houses){
    this.loadedHouse=houses;
    console.log('loadhouse'+houses.hid);
    return this.router.navigate(['add-house']);
  }


  storeHouse(name: string, size: number, address: string, city: string, zip: number, numRoom: number, numBath: number, numKitchen: number, numGarden: number, numLiving: number, numDining: number, numGarage: number){
    if(this.loadedHouse.hid==''){
      this.SaveHouse(name, size, address, city, zip, numRoom, numBath, numKitchen, numGarden, numLiving, numDining, numGarage);
    }else{
      this.UpdateHouse(name, size, address, city, zip, numRoom, numBath, numKitchen, numGarden, numLiving, numDining, numGarage);
    }
  }
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

  deleteHouse(hid:string){
    this.afs.doc(`houses/${hid}`).delete().then(() => {
      console.log("Document successfully deleted!");
  }).catch((error) => {
      console.error("Error removing document: ", error);
  });
  }

}
