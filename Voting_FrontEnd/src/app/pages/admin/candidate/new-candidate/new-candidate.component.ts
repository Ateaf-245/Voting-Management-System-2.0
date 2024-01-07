import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-candidate',
  templateUrl: './new-candidate.component.html',
  styleUrls: ['./new-candidate.component.css']
})
export class NewCandidateComponent implements OnInit{

  candidateData={
    firstName: '',
    lastName: '',
    partyName: '',
    photo: '',
    election: {
      election_id: ''
    }
  }

  photo: any;
   election: any;

 

  constructor(private _candidate:CandidateService,
    private _election:ElectionService,
    private router:Router,
    private sweetAlert:SweetAlertService){
      this.photo=null;
    }

    ngOnInit(): void {
      this._election.getAllElectionData().subscribe(
        (data)=>{
          this.election = data
        },
        (error)=>{
          Swal.fire("Error !!", "Error in loading data !", "error")
        }
      )
    }

    formSubmit(){
      if(this.candidateData.firstName.trim()==''|| this.candidateData.firstName==null ||
      this.candidateData.lastName.trim()==''|| this.candidateData.lastName==null ||
      this.candidateData.partyName.trim()==''|| this.candidateData.partyName==null ||
      this.candidateData.election.election_id.trim()==''|| this.candidateData.election.election_id==null){

      this.sweetAlert.showToast('info','Please fill all the details to procced further.');
      return
    }

    if(this.photo==''|| this.photo==null){
        
      this.sweetAlert.showToast('info','Please select the photo.');
      return
    }

    this._candidate.addCandidate(this.candidateData,this.photo).subscribe(
      (data)=>{
        Swal.fire("Success !!","Successfully Create new Candidate",'success');
        this.router.navigate(['/admin/candidates'])
      },
      (error)=>{
        console.log(error);
        Swal.fire("Failure !!","something Went worng !",'error');
      }
    )
    }

  onPhotoSelected(event:any) {
    if (event.target.files && event.target.files[0]) {
        this.photo = event.target.files[0];
    }
}

}
