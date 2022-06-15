import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HouseService } from 'src/app/shared/services/house.service';
import { Houses, User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-list-houses',
  templateUrl: './list-houses.component.html',
  styleUrls: ['./list-houses.component.css']
})
export class ListHousesComponent implements OnInit {

  @Input()
  houses!: Observable<Houses[]>
  
  constructor(public houseService: HouseService) { }

  ngOnInit(): void {
  }

}
