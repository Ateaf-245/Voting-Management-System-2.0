import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElectionService } from 'src/app/services/election/election.service';
import { VotingService } from 'src/app/services/voting/voting.service';

@Component({
  selector: 'app-election-result',
  templateUrl: './election-result.component.html',
  styleUrls: ['./election-result.component.css'],
  providers:[DatePipe]
})
export class ElectionResultComponent implements OnInit {
 

  election:any;
  eid:any

  result:any
  winningPercentage:any;

  constructor(private _election:ElectionService,
    private datePipe: DatePipe,
    private ActivatedRouter:ActivatedRoute,
    private _voting:VotingService) { }

  ngOnInit(): void {
    this.eid = this.ActivatedRouter.snapshot.params['eid']
    this._election.getElectionData(this.eid).subscribe(
      (data:any)=>{
        this.election = data

        this._voting.getResultByElection(this.eid).subscribe(
          (data)=>{
            this.result = data
            this.winningPercentage='50%';
            console.log(this.result)

          })
      }
    )
  }

  formattedDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy @ hh:mm a') || '';
  }

  formatNumber(originalNumber:any) {
    // Check if originalNumber is not null or undefined
    if (originalNumber != null) {
      // Round to two decimal places and convert to string
      return originalNumber.toFixed(2);
    }
  }
}
