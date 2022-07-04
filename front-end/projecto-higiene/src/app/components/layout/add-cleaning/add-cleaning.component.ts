import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addHours, endOfDay, startOfDay } from 'date-fns';
import flatpickr from 'flatpickr';
import { from, Observable, of } from 'rxjs';
import { CleaningService } from 'src/app/shared/services/cleaning.service';
import { HouseService } from 'src/app/shared/services/house.service';
import { Cleaning, Houses, User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-add-cleaning',
  templateUrl: './add-cleaning.component.html',
  styleUrls: ['./add-cleaning.component.css']
})
export class AddCleaningComponent implements OnInit {

  form!: FormGroup;
  timeControl: string = '';
  nameTitle: string = '';
  timeAvailable!: string[];
  houses!: Observable<Houses[]>;
  dataWorker:any[] = new Array();

  timeTemp!: Observable<any>

  timeobser!: Observable<any>

  workersTemp!: Observable<any>;

  cleaningList!: Observable<Cleaning[]>;

  workerId!:'';

  constructor(public cleaningService: CleaningService,public datepipe: DatePipe,private formBuilder: FormBuilder,public houseService:HouseService) {
    this.timeAvailable = ['08:00', '10:00', '14:00', '16:00', '18:00'];
   }

  ngOnInit(): void {
    this.houses = this.houseService.getHousesList();
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      datepicker: [null, Validators.required],
      time: [null, Validators.required],
      notes: [null, Validators.required],
    });
  }


  addEvent(ngForm: any): void {
    const dateTime = ngForm.value.date + 'T' + ngForm.value.time;
    const dateAsDate = new Date(dateTime);
    const adHours = addHours(new Date(dateTime), 2);
    const hoursaddded = (this.datepipe.transform(adHours, 'HH:mm') as string);
    this.cleaningList = this.cleaningService.getWorkersOcupados(ngForm.value.date, ngForm.value.time);
    for (let i = 0; i < this.dataWorker.length; i++) {
      this.cleaningList.subscribe(cleaning => {
        if (cleaning.length == 0) {
          this.workerId = this.dataWorker[i].uid;
        } else {
          for (let j = 0; j < cleaning.length; j++) {
            if (this.dataWorker[i].uid == cleaning[j].workerid) {
              continue;
            } else {
              this.workerId = this.dataWorker[i].uid;
              break;
            }
          }
        }

      })
    }
    setTimeout(() => {
      this.cleaningService.SaveCleaning(ngForm.value.title, this.workerId, ngForm.value.house, dateAsDate, ngForm.value.date, ngForm.value.time, hoursaddded, ngForm.value.notes);
    }, 1000);
  }

  //Atualizar horarios disponiveis conforme data selecionada
  async onDateChange(dattt:string){
    
    let numberofWorkers=0;
    let numberofclean=0;
    this.timeControl=dattt;

    //FALTA CONSEGUIR RECEBER PROMISE COM TODOS OS DADOS
    await this.cleaningService.getWorkers().then(docArr => {
      this.workersTemp=of(docArr);
    });
  

    this.workersTemp.subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].roles.worker == true) {
          numberofWorkers++;
          this.dataWorker.push(data[i]);
        }
      }
    });
    this.timeAvailable = ['08:00', '10:00', '14:00', '16:00', '18:00'];
    let i = 0;
    while (i < this.timeAvailable.length) {

      await this.cleaningService.checkAvailableTime(this.timeControl, this.timeAvailable[i]).then(docArr => {
        this.timeTemp=of(docArr);
      });

      this.timeTemp.subscribe(payload => {
        numberofclean = payload.length;
        if (payload.length >= numberofWorkers) {
          this.timeAvailable.splice(i, 1);
        }else{
          i++;
        }
      });
      }
      this.timeobser=of(this.timeAvailable)

  }

}
