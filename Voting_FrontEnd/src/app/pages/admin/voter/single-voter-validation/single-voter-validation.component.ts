import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoterService } from 'src/app/services/voters/voter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-single-voter-validation',
  templateUrl: './single-voter-validation.component.html',
  styleUrls: ['./single-voter-validation.component.css']
})
export class SingleVoterValidationComponent implements OnInit {

  vid:any
  viewData:any
  msg:any

  constructor(private voter:VoterService,
    private _activedRouter:ActivatedRoute,
    private _router:Router){}

  ngOnInit(): void {
     this.vid = this._activedRouter.snapshot.params['vid'];

     this.voter.getSingleValidationVoter(this.vid).subscribe(
      (data)=>{
      this.viewData=data
      this.viewData.user.image = 'data:image/jpeg;base64,' +  this.viewData.user.image        

      },
      (error)=>{
        Swal.fire("Error","something went wrong","error")
      }
      )
  }

  async approve(verification_id:any){

       this.voter.deleteApprovedVerification(verification_id).subscribe(
      (data)=>{
        Swal.fire("Success","Voter documentation Approved successfully","success")
        this._router.navigate(["/admin/voterValidation"])
      },
      (error)=>{
        Swal.fire("Error","something went wrong","error")
      }
    )
    
  }

  async reject(email:any){

    this.msg = await Swal.fire({
      input: 'textarea',
      inputLabel: 'Rejection Reason',
      inputPlaceholder: 'Type your message here...',
      showConfirmButton:true,
      confirmButtonColor: '#3085d6',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },    
    })

    this.voter.deleteRejectedVerification(email).subscribe(
      (data)=>{
        this.voter.rejectedVerificationMail(email,this.msg).subscribe(
          (data)=>{},(error)=>{}
        )

        Swal.fire("Rejected","Voter documentation rejected successfully","success")
        this._router.navigate(["/admin/voterValidation"])
      },
      (error)=>{
        Swal.fire("Error","something went wrong","error")
      }
    )
  }

}
