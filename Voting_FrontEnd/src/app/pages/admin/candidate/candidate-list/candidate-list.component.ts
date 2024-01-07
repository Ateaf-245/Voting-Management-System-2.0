import { Component, OnInit } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate/candidate.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css']
})
export class CandidateListComponent  implements OnInit {
  
  candidates:any
  check=true
  filterTerm:any

  constructor(private _candidate:CandidateService){}
  ngOnInit(): void {
    this._candidate.getCandidate().subscribe(
      (data)=>{
        this.candidates=data;
        console.log(this.candidates)
        this.check=this.candidates.length==0
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

  deleteCandidate(cid:any){

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
    this._candidate.deleteCandidate(cid).subscribe(
      (data)=>{
        this.candidates = this.candidates.filter((c: any) => c.candidate_id != cid)
        this.check=this.candidates.length==0
        Swal.fire("Success !!", "Candidate deleted successfully", 'success');

      },
      (error)=>{
        Swal.fire("Error !!", "Error in deleting data !", "error")
      }
    )
  }
}
    )
}
}
