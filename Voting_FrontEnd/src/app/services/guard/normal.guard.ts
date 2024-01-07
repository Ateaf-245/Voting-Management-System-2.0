import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class NormalGuard implements CanActivate {
  [x: string]: any;

  constructor (private login:LoginService, private router:Router){
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // Place your guard logic here

    if (this.login.isLoggedIn() && this.login.getUserRole()=='NORMAL') {
      return true
    }

    this.router.navigate(['login'])
    return false;
  }
}