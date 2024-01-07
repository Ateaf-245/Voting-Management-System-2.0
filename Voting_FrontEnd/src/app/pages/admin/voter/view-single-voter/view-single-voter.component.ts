import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VoterService } from 'src/app/services/voters/voter.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-single-voter',
  templateUrl: './view-single-voter.component.html',
  styleUrls: ['./view-single-voter.component.css']
})
export class ViewSingleVoterComponent implements OnInit {

  viewData: any = {  };
  email:any

  constructor(private voter:VoterService,
              private _activedRouter:ActivatedRoute){}

  ngOnInit(): void {
    
    this.email = this._activedRouter.snapshot.params['email'];

    this.voter.getUserByEmail(this.email).subscribe(
      (data)=>{
      this.viewData=data
      this.viewData.image = 'data:image/jpeg;base64,' +  this.viewData.image        

      },
      (error)=>{
        Swal.fire("Error","something went wrong","error")
      }
      )
  }

}
