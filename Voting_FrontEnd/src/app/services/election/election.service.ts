import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})

export class ElectionService {

 

  constructor(private http:HttpClient) { }

  public addElection(data:any){
   return this.http.post(`${baseUrl}/elections/addNew`,data);
  }

  public updateElection(data:any){
    return this.http.put(`${baseUrl}/elections/update`,data);
  }

  public getAllElectionData(){
    return this.http.get(`${baseUrl}/elections/`);
  }

  public getElectionData(eid:any){
    return this.http.get(`${baseUrl}/elections/${eid}`);
  }

  public deleteElectionData(eid:any){
    return this.http.delete(`${baseUrl}/elections/${eid}`);
  }
}
