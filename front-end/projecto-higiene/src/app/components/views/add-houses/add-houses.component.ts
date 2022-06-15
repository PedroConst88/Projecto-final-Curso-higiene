import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HouseService } from 'src/app/shared/services/house.service';
import { Houses } from 'src/app/shared/services/user';


@Component({
  selector: 'app-add-houses',
  templateUrl: './add-houses.component.html',
  styleUrls: ['./add-houses.component.css']
})
export class AddHousesComponent implements OnInit {

  houses!: Houses;
  constructor(public houseService: HouseService) {
   }

  ngOnInit(): void {
    this.houses=this.houseService.loadedHouse;
  }
  convertNumber(num:string){
    return Number(num);
  }

}
