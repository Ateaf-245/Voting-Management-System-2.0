import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-candidate',
  templateUrl: './view-candidate.component.html',
  styleUrls: ['./view-candidate.component.css']
})
export class ViewCandidateComponent implements OnInit {
  
  candidateData:any={
    candidate_id: '',
    firstName: '',
    lastName: '',
    partyName: '',
    photo: '',
    election: {
      election_id: '',
      name: '',
      startDateTime: '',
      endDateTime: '',
    }
  }

   election: any;

   constructor(private _candidate:CandidateService,
    private _election:ElectionService,
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
}
