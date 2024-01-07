import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voter-election',
  templateUrl: './voter-election.component.html',
  styleUrls: ['./voter-election.component.css'],
  providers: [DatePipe],
})
export class VoterElectionComponent  implements OnInit{

  filterTerm:any
  election:any;
  
  constructor(private _election:ElectionService,
    private datePipe: DatePipe,
    private _router:Router,
    private _candidate:CandidateService) { }

  ngOnInit(): void {
    this._election.getAllElectionData().subscribe(
      (data:any)=>{
        this.election = data
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

  formattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy @ hh:mm a') || '';
  }
    
  check(startDateTime:any,endDateTime:any){

    const electionStartDateTime = new Date(startDateTime);
    const electionEndDateTime = new Date(endDateTime);
    // Get the current date and time
    const currentDateTime = new Date();
    //ongoing
    if( electionStartDateTime < currentDateTime && electionEndDateTime > currentDateTime){
      return 1;
    }
      //future
      else if(currentDateTime < electionStartDateTime){ 
      return 0;
    }
    // election is over
    else if(currentDateTime > electionEndDateTime){ 
      return -1;
    }
    return;
  }

  len:any

  viewResult(startDateTime:any,endDateTime:any,eid:any){
    console.log(this.check(startDateTime,endDateTime))
    if(this.check(startDateTime,endDateTime)==1){
      Swal.fire('infomation','Currently Election is still in progress. Please wait for the election to get overed. ','info')
    } 
    else if(this.check(startDateTime,endDateTime)==-1){
      this._candidate.getcandidateByElection(eid).subscribe((data)=>{
        this.len=data;
        if(this.len.length>0)
          this._router.navigate(['/voter/elections/result/'+eid])
        else{
          Swal.fire('infomation','No candidate has registered yet. ','info')
        }
      })
    }
    else {
      Swal.fire('infomation','Election is yet to start. ','info')
    }
  }
  
}
