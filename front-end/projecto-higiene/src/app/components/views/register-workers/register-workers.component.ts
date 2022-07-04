import { Component, OnInit } from '@angular/core';
import { EMPTY, empty, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/services/user';

@Component({
  selector: 'app-register-workers',
  templateUrl: './register-workers.component.html',
  styleUrls: ['./register-workers.component.css']
})
export class RegisterWorkersComponent implements OnInit {

  workers!: Observable<User[]>;
  workersList!: Observable<User[]>;
  public showFirst:boolean = false;
  toggle() { 
    this.showFirst = !this.showFirst; 
  }
  uid!: string;

  toggle2(uid: string) { 
    this.uid = uid; 
  }

  constructor(public authService: AuthService) { }

  //push para array dos users recebidos caso role seja worker
  ngOnInit(): void {
    this.workers = this.authService.getWorkersAdmin();
    const arrayWorkers: User[]=[];
    this.workers.subscribe(data=>{
      for(let i=0;i<data.length;i++){
        if(data[i].roles.worker){
          arrayWorkers.push(data[i])
        }
      }
      this.workersList=of(arrayWorkers);

    })
  }
  deleteWorker(){
    this.authService.deleteWorker(this.uid);
  }

}
