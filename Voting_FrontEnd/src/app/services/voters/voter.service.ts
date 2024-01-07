import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class VoterService {

  constructor(private http:HttpClient) { }

  public getAllVoter(){
    return this.http.get(`${baseUrl}/user/admin/voters`)
  }

  public getUserByEmail(email:any){
    return this.http.get(`${baseUrl}/user/voter/${email}`);
  }

  public deleteVoter(email:any){
    return this.http.delete(`${baseUrl}/user/voter/${email}`);
  }

  public getValidationVoters(){
    return this.http.get(`${baseUrl}/user/admin/verify`)
  }

  public getSingleValidationVoter(vid:any){
    return this.http.get(`${baseUrl}/user/admin/verify/${vid}`)
  }

  public deleteApprovedVerification(vid:any){
    return this.http.delete(`${baseUrl}/user/admin/approved/${vid}`)
  }

  public deleteRejectedVerification(email:any){
    return this.http.delete(`${baseUrl}/user/admin/reject/${email}`)
  }

  public rejectedVerificationMail(email:any,message:any){
    return this.http.post(`${baseUrl}/user/admin/reject/${email}`,message)
  }
}
