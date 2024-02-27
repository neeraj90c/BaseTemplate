import { Injectable } from '@angular/core';
import { Behavior } from 'popper.js';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ConfirmmodalserviceService {
  notificationName:string=''
  data={}

  constructor() { }


  openSwalModal(name:string,data:any):Observable<any>{
    const decisionSubject = new BehaviorSubject<any>(null);
    Swal.fire({
      title:`Are you sure, you want to delete ${name} ?`,
      text:"You won't be able to revert this!",
      icon:"warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((res)=>{
      if (res.value) {
        decisionSubject.next(data); // User confirmed, emit the data
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        decisionSubject.next(null); // User canceled, emit null
      } else {
        decisionSubject.next(null); // Handle other dismissals (optional)
      }
  
      decisionSubject.complete();
    })
    return decisionSubject.asObservable();
  }



  openConfirmationModal(title:string,context:string,data:any):Observable<any>{
    const decisionSubject = new BehaviorSubject<any>(null);
    Swal.fire({
      title:title,
      text:context,
      icon:"question",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes Create It'
    }).then((res)=>{
      if (res.value) {
        decisionSubject.next(data); // User confirmed, emit the data
      } else if (res.dismiss === Swal.DismissReason.cancel) {
        decisionSubject.next(null); // User canceled, emit null
      } else {
        decisionSubject.next(null); // Handle other dismissals (optional)
      }
  
      decisionSubject.complete();
    })
    return decisionSubject.asObservable();
  }

  
}
