import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { LoginService } from "../login/login.service";

@Injectable({
  providedIn: 'root'
})
export class VotingService {

  user:any;
  constructor(private _http:HttpClient,
    private _login:LoginService) { }

  public uservote(e:any){
    return this._http.post(`${baseUrl}/VoterVotingStatus/add`,e)
  }

  public checkStatus(check:any){
    // Convert the check object to HttpParams
    const params = new HttpParams({ fromObject: check });

    // Use the params in the GET request
    return this._http.get(`${baseUrl}/VoterVotingStatus/check`, { params });
  }

  public getDashboardData(userId:any){
    return this._http.get(`${baseUrl}/VoterVotingStatus/dashboard/${userId}`)
  }

  public getResultByElection(eid:any){
    return this._http.get(`${baseUrl}/votesCounter/ElectionResult/${eid}`)
  }
}
