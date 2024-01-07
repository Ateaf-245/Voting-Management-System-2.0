import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import { ElectionService } from 'src/app/services/election/election.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-election-list',
  templateUrl: './election-list.component.html',
  styleUrls: ['./election-list.component.css'],
  providers: [DatePipe],
})
export class ElectionListComponent implements OnInit{
 
  filterTerm:any
  elections:any
  check=true

  constructor(private _election:ElectionService,
              private datePipe: DatePipe,
              private _candidate:CandidateService,
              private _router:Router){}

  ngOnInit(): void {
    this._election.getAllElectionData().subscribe(
      (data)=>{
        this.check=false
        this.elections = data 
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      },
    )
  }

  formattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy @ hh:mm a') || '';
  }

  deleteElection(election_id:any){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {

        this._election.deleteElectionData(election_id).subscribe(
          (data) => {
            this.elections = this.elections.filter((v: any) => v.election_id != election_id)
            Swal.fire("Success !!", "Election deleted successfully", 'success');

          },
          (error) => {
            Swal.fire("Error !!", "something went wrong", 'error');
          }
        )
      }

    })

  }

  checkStatus(startDateTime:any,endDateTime:any){

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
    console.log(this.checkStatus(startDateTime,endDateTime))
    if(this.checkStatus(startDateTime,endDateTime)==1){
      Swal.fire('infomation','Currently Election is still in progress. Please wait for the election to get overed. ','info')
    } 
    else if(this.checkStatus(startDateTime,endDateTime)==-1){
      this._candidate.getcandidateByElection(eid).subscribe((data)=>{
        this.len=data;
        if(this.len.length>0)
          this._router.navigate(['/admin/elections/result/'+eid])
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
