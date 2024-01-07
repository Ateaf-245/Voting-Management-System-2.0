import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseUrl from '../helper';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http:HttpClient) { }

  // add candidate
  public addCandidate(data:any, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    
    formData.append('user', new Blob([JSON.stringify(data)], {
        type: "application/json"
    }));
   
      formData.append('photo', photo, photo.name);
    console.log(formData)
    return this.http.post(`${baseUrl}/candidate/addNew`,formData)
  }
  
  // update candidate
  updateCandidate(data:any) {
    return this.http.put(`${baseUrl}/candidate/update`,data)
  }

  // get all candidate 
  public getCandidate(){
    return this.http.get(`${baseUrl}/candidate/`)
  }

  // get single candidate
  public getSingleCandidate(cid:any){
    return this.http.get(`${baseUrl}/candidate/${cid}`)
  }

  // user end
  getcandidateByElection(eid:any){
    return this.http.get(`${baseUrl}/candidate/election/${eid}`)
  }

  // delete candidate
  public deleteCandidate(cid:any){
    return this.http.delete(`${baseUrl}/candidate/${cid}`)
  }


 

  
}
