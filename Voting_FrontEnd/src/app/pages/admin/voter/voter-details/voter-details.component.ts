import { Component, OnInit } from '@angular/core';
import { VoterService } from 'src/app/services/voters/voter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-voter-details',
  templateUrl: './voter-details.component.html',
  styleUrls: ['./voter-details.component.css']
})
export class VoterDetailsComponent  implements OnInit{

voters:any

filterTerm:any;
check:any

constructor(private voter:VoterService){}


  ngOnInit(): void {
    this.voter.getAllVoter().subscribe(
      (data)=>{
        this.voters=data;
        this.check =this.voters.length==0
      },
      (error)=>{
        Swal.fire("Error !!", "Error in loading data !", "error")
      }
    )
  }

  deleteVoter(email:any){
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

        this.voter.deleteVoter(email).subscribe(
          (data) => {

            
            this.voters = this.voters.filter((v: any) => v.email != email)
            Swal.fire("Success !!", "Voter deleted successfully", 'success');

          },
          (error) => {
            Swal.fire("Error !!", "something went wrong", 'error');
          }
        )
      }

    })
  }

}
