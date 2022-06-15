import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { HouseService } from 'src/app/shared/services/house.service';
import { Houses } from 'src/app/shared/services/user';

@Component({
  selector: 'app-card-houses',
  templateUrl: './card-houses.component.html',
  styleUrls: ['./card-houses.component.css']
})
export class CardHousesComponent implements OnInit {

  @Input()
  houses! : Houses;

  constructor(public houseService: HouseService) { }

  ngOnInit(): void {
  }

}
