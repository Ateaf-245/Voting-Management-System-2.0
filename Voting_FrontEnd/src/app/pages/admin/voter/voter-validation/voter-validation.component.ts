import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voters/voter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voter-validation',
  templateUrl: './voter-validation.component.html',
  styleUrls: ['./voter-validation.component.css']
})
export class VoterValidationComponent implements OnInit {

  voters:any
  filterTerm:any;

  constructor(private _voter:VoterService){}

  ngOnInit(): void {
     this._voter.getValidationVoters().subscribe(
      (data)=>{
        this.voters=data;
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

}
