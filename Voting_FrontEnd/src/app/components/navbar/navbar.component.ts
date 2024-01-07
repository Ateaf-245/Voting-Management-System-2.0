import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private _login:LoginService,
              private router:Router){
  }

  public logout() {
    this._login.logout()
    this.router.navigate(['login'])
  }

}
