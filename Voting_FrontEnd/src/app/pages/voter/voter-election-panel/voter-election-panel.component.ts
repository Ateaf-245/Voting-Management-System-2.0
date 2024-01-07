import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import { LoginService } from 'src/app/services/login/login.service';
import { VotingService } from 'src/app/services/voting/voting.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voter-election-panel',
  templateUrl: './voter-election-panel.component.html',
  styleUrls: ['./voter-election-panel.component.css'],
  providers:[DatePipe]
})
export class VoterElectionPanelComponent implements OnInit{

  eid:any
  election:any;
  candidates:any;
  user:any;

  checkStatus:any;

  votingDetails ={
    voterId:"",
    electionId:"",
    candidateId:""
  }

  constructor(private _election:ElectionService,
    private datePipe: DatePipe,
    private ActivatedRouter:ActivatedRoute,
    private _candidate:CandidateService,
    private voting:VotingService,
    private _login:LoginService,
    private router:Router,
    ) { 
      this.user = this._login.getUserDetials();
    }

  formattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy @ hh:mm a') || '';
  }
  ngOnInit(): void {

    this.eid = this.ActivatedRouter.snapshot.params['eid']
    this._election.getElectionData(this.eid).subscribe(
      (data:any)=>{

        this.election = data

        this._candidate.getcandidateByElection(this.eid).subscribe(
          (data)=>{

            this.candidates = data

            this.votingDetails.voterId = this.user.user.userId;
            this.votingDetails.electionId = this.candidates[0].election.election_id;

            this.voting.checkStatus(this.votingDetails).subscribe(
              (data)=>{
                this.checkStatus = data;

                if (this.checkStatus) {
                  Swal.fire("Infomation", "You have alredy voted in this Election!", "info")
                  this.router.navigate(['/voter/elections'])
                }
              },
              (error)=>{
                Swal.fire("Error !!", "Error in loading data !", "error")
              }
            )

          },
          (error)=>{
            Swal.fire("Error !!", "Error in loading data !", "error")
          }
        )
        
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

  vote(e:any){
    
    this.votingDetails.voterId = this.user.user.userId;
    this.votingDetails.candidateId = e.candidate_id;
    this.votingDetails.electionId = e.election.election_id;

    this.voting.uservote(this.votingDetails).subscribe(
      (data)=>{
        Swal.fire("Successful !!", "Thank you for voting !", "success")
        this.router.navigate(['/voter/elections']);
      },
      (error)=>{
            Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )

  }
}
