import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { isAdmin } from '@firebase/util';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.user$.pipe(
        take(1),
       map(user => user && user.roles.admin? true:false),
        tap(isAdmin =>{
          if (!isAdmin){
            console.error('Access denied-Admins only')
            this.router.navigate(['dashboard'])
          }
        })
      );
      }

}
