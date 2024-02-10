import { Injectable, OnInit, ViewChild } from '@angular/core';
import { User } from '../interface/User';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  UserData = {}

  // private userObject = new BehaviorSubject<any>({});

  // setData(value: any) {
  //   this.userObject.next(value);
  // }

  saveUserData(data:User){
    localStorage.setItem('userObject',encodeURIComponent(JSON.stringify(data)))
  }

  User():User{
    let userObject:any = localStorage.getItem('userObject')
    this.UserData=JSON.parse(decodeURIComponent(userObject))
    return JSON.parse(decodeURIComponent(userObject))
  }

  authorizedPages: string[] = []

  isUserAdminOrSupervisor():boolean{
    let roles = this.User().roleId.split(",").map(function(item) {
      return item.trim();
  })
    if(roles.includes('2') || roles.includes('3')){
      return true
    }else{
      return false
    }
  }


  isAdmin():boolean{
    let roles = this.User().roleId.split(",").map(function(item) {
      return item.trim();
  })
    if(roles.includes('3')){
      return true
    }else{
      return false
    }
  }
  
  constructor() { }
}
