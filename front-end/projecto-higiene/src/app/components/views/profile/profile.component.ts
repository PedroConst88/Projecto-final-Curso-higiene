import { Component, Injectable, NgZone, OnInit } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HouseService } from 'src/app/shared/services/house.service';
import { Houses, User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  selectedImage: any;
  houses!: Observable<Houses[]>;

  constructor(public authService: AuthService, public houseService: HouseService, public ngZone: NgZone) { }


  ngOnInit(): void {
    setTimeout(() => 
    {
      this.houses = this.houseService.getHousesList();
    },
    1000);
    const data: Houses = {
      owner: '',
      hid: '',
      name: '',
      address: '',
      postcode: 0,
      city: '',
      size: 0,
      numRoom: 0,
      numBath: 0,
      numKitchen: 0,
      numGarden: 0,
      numLiving: 0,
      numDining: 0,
      numGarage: 0
    };
    this.houseService.loadedHouse=data;

  }


}


