import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from '../helper';
import { Token } from '@angular/compiler';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public status = true;

  public loginSubjectStatus = new Subject<boolean>();

  constructor(private http: HttpClient) { 
    
  }

  //change password
  public updatePassword(passwords:any){
    return this.http.post(`${baseUrl}/user/change-password`,passwords);
  }


  //current user
  public getCurrentUser(){
    return this.http.get(`${baseUrl}/current-user`);
  }

  //generate token
  public generateToken(loginData: any){
    return this.http.post(`${baseUrl}/generate-token`,loginData);
  }

  //login user : set token in localStorage
  public loginUser(token: any)
  {
    localStorage.setItem("token",token);
    return true;
  }

  //isLogin : user is logged in or not
  public isLoggedIn(){
    let tokenStr  = localStorage.getItem("token");
    if(tokenStr==undefined || tokenStr=='' || tokenStr==null){
        return false;
    } else {
        return true;
    }
  }

  //logout : remove token from local storage
  public logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user")
    localStorage.clear
    return true;
  }

  // get token
  public getToken(){
    return localStorage.getItem("token");
  }


  // set userDetials
  public setUser(user: any){
    localStorage.setItem('user',JSON.stringify(user));
  }

  
user:any

  // get userDetials
  public getUserDetials(){
    let userStr = localStorage.getItem("user");
    if(userStr!=null){
      this.user = JSON.parse(userStr);
      return this.user
    } else {
      this.logout();
      return null;
    }
  }

  //get user role
  public getUserRole(){
    let user = this.getUserDetials();
    return user.authorities[0].authority;
  }
}
