import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private login:LoginService,
    private router:Router,){
      
    }
  ngOnInit(): void {
    if (this.login.getUserRole()=='ADMIN') {
  
      //redirect ..ADMIN: admin-dashboard
      this.router.navigate(['/admin/*'])
      this.login.status = true
      this.login.loginSubjectStatus.next(true);
      
    }else  if (this.login.getUserRole()=='NORMAL'){

      //redirect ..NORMAL: normal-dashboard
      this.router.navigate(['voter/'])
      this.login.status = true
      this.login.loginSubjectStatus.next(true);

    }
  }

}
