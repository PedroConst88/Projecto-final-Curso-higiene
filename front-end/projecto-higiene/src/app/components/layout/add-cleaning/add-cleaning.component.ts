import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { addHours, endOfDay, startOfDay } from 'date-fns';
import { CleaningService } from 'src/app/shared/services/cleaning.service';

@Component({
  selector: 'app-add-cleaning',
  templateUrl: './add-cleaning.component.html',
  styleUrls: ['./add-cleaning.component.css']
})
export class AddCleaningComponent implements OnInit {


  constructor(public cleaningService: CleaningService) { }

  ngOnInit(): void {
  }


  addEvent(title: string,time: string, notes: any): void {
    this.cleaningService.SaveCleaning(title,new Date(time),addHours(new Date(time), 2),notes);

  }

}
