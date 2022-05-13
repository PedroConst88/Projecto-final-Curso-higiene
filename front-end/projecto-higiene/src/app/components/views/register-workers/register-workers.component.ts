import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register-workers',
  templateUrl: './register-workers.component.html',
  styleUrls: ['./register-workers.component.css']
})
export class RegisterWorkersComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
