import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  data:any
  user:any

  oldPassword:any
  newPassword:any
  confirmNewPassword:any

  passwords={
    userId:'',
    oldPassword:'',
    newPassword:''
  }

  passwordChangeStatus=false

  constructor(private _user:LoginService,private _router:Router) { 
    this.passwordChangeStatus=false
  }

  ngOnInit(): void {
   this.data = this._user.getUserDetials();
   this.user = this.data.user
  }

  changePassword(){
    this.passwordChangeStatus=true;
  }

  updatePassword(){
    if(this.newPassword==this.confirmNewPassword){

      this.passwords.userId = this.user.userId;
      this.passwords.oldPassword = this.oldPassword;
      this.passwords.newPassword= this.newPassword;

      this._user.updatePassword(this.passwords).subscribe(
        (data)=>{
          this.passwordChangeStatus=false;
          Swal.fire("Success",'Your password was changed Successfully','success')
        },
        (error)=>{
          Swal.fire("error",error.message,'error')
        }
      )
    }
  }
}
