import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

//add user
public addNewUser(registrationData:any, photo: File): Observable<any> {
    const formData: FormData = new FormData();
    
    formData.append('user', new Blob([JSON.stringify(registrationData)], {
        type: "application/json"
    }));
   
      formData.append('photo', photo, photo.name);
    
  return this.http.post(`${baseUrl}/user/voter`,formData);
}
}
