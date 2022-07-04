import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class WorkerGuard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.user$.pipe(
        take(1),
       map(user => user && (user.roles.worker || user.roles.client)? true:false),
        tap(isWorker =>{
          if (!isWorker){
            console.error('Access denied-Workers and Clients only')
            this.router.navigate(['workers'])
          }
        })
      );
      }
  
}
