import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ElectionService } from 'src/app/services/election/election.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-election',
  templateUrl: './update-election.component.html',
  styleUrls: ['./update-election.component.css']
})
export class UpdateElectionComponent implements OnInit {

  viewData:any

  election_id:any

  constructor(private _election:ElectionService,
    private _route:Router,
    private sweetAlert:SweetAlertService,
    private _activedRouter:ActivatedRoute){}


  ngOnInit(): void {
    this.election_id = this._activedRouter.snapshot.params['eid'];
    this._election.getElectionData(this.election_id).subscribe(
      (data)=>{
        this.viewData = data;
      },
    (error)=>{
      Swal.fire("Failure !!","Unable to load the data !",'error');
    })
  }

    formSubmit(){
      if(this.viewData.name.trim()==''|| this.viewData.name==null ||
        this.viewData.descriptions.trim()==''|| this.viewData.descriptions==null ||
        this.viewData.startDateTime.trim()==''|| this.viewData.startDateTime==null ||
        this.viewData.endDateTime.trim()==''|| this.viewData.endDateTime==null){
  
        this.sweetAlert.showToast('info','Please fill all the details to procced further.');
        return
      }
  
      this._election.updateElection(this.viewData).subscribe(
        (data:any)=>{
          Swal.fire("Success !!","Successfully Updated the Election",'success');
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
