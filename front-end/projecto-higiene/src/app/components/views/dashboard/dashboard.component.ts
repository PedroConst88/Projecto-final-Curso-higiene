import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

import {
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  subHours
} from 'date-fns';
import { Observable, Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { CleaningService } from 'src/app/shared/services/cleaning.service';
import { Cleaning } from 'src/app/shared/services/user';
import { DatePipe } from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt-PT';
registerLocaleData(localePt);


const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-dashboard',
 // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cleaningTemp!:Observable<Cleaning[]>;
  public showFirst:boolean = false;
  //esconder menu de adicionar conforme click no botao adicionar
  toggle() { 
    this.showFirst = !this.showFirst; 
  }

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  cleaning!: Observable<Cleaning[]>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  refresh = new Subject<void>();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor(public authService: AuthService, private modal: NgbModal, public cleaningService: CleaningService,private datePipe: DatePipe) { }

  //load marcações
  ngOnInit(): void {
      this.events = [];
      this.cleaningService.getCleaning().subscribe(data => {
        for(var i = 0; i < data.length; i++){
          this.events = [
            ...this.events,
            {
              title: data[i].name,
              id:data[i].cid,
              start: addHours((new Date(data[i].dateClean+'T'+data[i].start+'')),1),
              end: addHours((new Date (data[i].dateClean+'T'+data[i].end)),1),
              color!: colors.red.primary,
            },
          ];
        }
      });

  }

  

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}