import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login/login.service';
import { VotingService } from 'src/app/services/voting/voting.service';

@Component({
  selector: 'app-voter-dashboard',
  templateUrl: './voter-dashboard.component.html',
  styleUrls: ['./voter-dashboard.component.css']
})
export class VoterDashboardComponent implements OnInit {

  user:any
  dashBoard:any
  constructor(private _voting:VotingService,
    private _login:LoginService) {

    this.user = this._login.getUserDetials().user.userId;
  }

  ngOnInit(): void {

    this._voting.getDashboardData(this.user).subscribe(
      (data)=>{
        this.dashBoard = data;
      }
    )
  }

}
