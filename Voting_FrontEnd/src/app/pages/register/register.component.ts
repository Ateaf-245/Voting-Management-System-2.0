import { Component } from '@angular/core';
import { RegisterService } from 'src/app/services/register/register.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registrationData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    address: '',
   
};

confirmPassword:any
photo:any


  constructor(private register:RegisterService,
              private router:Router,
              private sweetAlert:SweetAlertService){
                this.photo=null;
              }

  formSubmit(){

    if(this.registrationData.firstName.trim()==''|| this.registrationData.firstName==null ||
       this.registrationData.lastName.trim()==''|| this.registrationData.lastName==null ||
       this.registrationData.email.trim()==''|| this.registrationData.email==null ||
       this.registrationData.phone.trim()==''|| this.registrationData.phone==null ||
       this.registrationData.password.trim()==''|| this.registrationData.password==null ||
       this.confirmPassword.trim()==''|| this.confirmPassword==null ||
       this.registrationData.address.trim()==''|| this.registrationData.address==null){

      this.sweetAlert.showToast('info','Please fill all the details to procced further.');
      return
    }

    
    if(this.registrationData.password.trim()!=this.confirmPassword.trim() || this.registrationData.password!=this.confirmPassword){
        
      this.sweetAlert.showToast('info','Password does not match.');
      return
    }

    if(this.photo==''|| this.photo==null){
        
      this.sweetAlert.showToast('info','Please select the photo.');
      return
    }


    this.register.addNewUser(this.registrationData,this.photo).subscribe(
      (data)=>{
        Swal.fire("Success !!",data.message,'success');
        this.router.navigate(['/login'])
      
      },
      (error)=>{
        Swal.fire("Failure !!",error.error.message,'error');
      }
    )
  }

  onPhotoSelected(event:any) {
    if (event.target.files && event.target.files[0]) {
        this.photo = event.target.files[0];
    }
}

}
