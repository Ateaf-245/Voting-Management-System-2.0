import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ElectionService } from 'src/app/services/election/election.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-election',
  templateUrl: './new-election.component.html',
  styleUrls: ['./new-election.component.css']
})
export class NewElectionComponent {
  viewData={
    name:'',
    descriptions:'',
    startDateTime:'',
    endDateTime:'',
  }

  constructor(private _election:ElectionService,
              private _route:Router,
              private sweetAlert:SweetAlertService){}


  formSubmit(){
    if(this.viewData.name.trim()==''|| this.viewData.name==null ||
      this.viewData.descriptions.trim()==''|| this.viewData.descriptions==null ||
      this.viewData.startDateTime.trim()==''|| this.viewData.startDateTime==null ||
      this.viewData.endDateTime.trim()==''|| this.viewData.endDateTime==null){

      this.sweetAlert.showToast('info','Please fill all the details to procced further.');
      return
    }

    this._election.addElection(this.viewData).subscribe(
      (data:any)=>{
        Swal.fire("Success !!","Successfully Create new Election",'success');
        this._route.navigate(['/admin/elections'])
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failure !!","something Went worng !",'error');
      }
    )

  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
}
