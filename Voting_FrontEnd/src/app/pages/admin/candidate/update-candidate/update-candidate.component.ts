import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-candidate',
  templateUrl: './update-candidate.component.html',
  styleUrls: ['./update-candidate.component.css']
})
export class UpdateCandidateComponent implements OnInit {
  
  candidateData:any={
    candidate_id: '',
    firstName: '',
    lastName: '',
    partyName: '',
    image: '',
    election: {
      election_id: '',
      name: '',
      startDateTime: '',
      endDateTime: '',
    }
  }

  photo: any;
   election: any;

   constructor(private _candidate:CandidateService,
    private _election:ElectionService,
    private router:Router,
    private sweetAlert:SweetAlertService,
    private _activedRouter:ActivatedRoute){
      
    }

   ngOnInit(): void {
    this._election.getAllElectionData().subscribe(
      (data)=>{
        this.election = data
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    );

    this.candidateData.candidate_id = this._activedRouter.snapshot.params['cid'];

    this._candidate.getSingleCandidate(this.candidateData.candidate_id).subscribe(
      (data)=>{
        this.candidateData = data
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
    this.candidateData.election.election_id==''|| this.candidateData.election.election_id==null){

    this.sweetAlert.showToast('info','Please fill all the details to procced further.');
    return
  }

  this._candidate.updateCandidate(this.candidateData).subscribe(
    (data)=>{
      Swal.fire("Success !!","Successfully updatefCandidate",'success');
      this.router.navigate(['/admin/candidates'])
    },
    (error)=>{
      Swal.fire("Failure !!","something Went worng !",'error');
    }
  )

}

}
