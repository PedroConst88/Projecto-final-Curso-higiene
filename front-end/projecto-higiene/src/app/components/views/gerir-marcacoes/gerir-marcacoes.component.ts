import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Cleaning} from 'src/app/shared/services/user';

@Component({
  selector: 'app-gerir-marcacoes',
  templateUrl: './gerir-marcacoes.component.html',
  styleUrls: ['./gerir-marcacoes.component.css']
})
export class GerirMarcacoesComponent implements OnInit {

  cleaningList!: Observable<Cleaning[]>;
  cid!: string;

  toggle(cid: string) { 
    this.cid = cid; 
  }
  constructor(public authService: AuthService,public datepipe: DatePipe) { }

  ngOnInit(): void {
      this.cleaningList = this.authService.getCleaningAdmin();
  }
  deleteMarc(){
    this.authService.deleteMarc(this.cid)
  }

}
