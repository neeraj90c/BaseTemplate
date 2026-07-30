import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { LoaderService } from './services/loader.service';

@Injectable()
export class ValidationInterceptor implements HttpInterceptor {

  constructor(private router:Router, private loaderService:LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    this.loaderService.turnOffLoader.subscribe(search => {
      if(search){
        this.loaderService.isLoading.next(false)
      }else{
        this.loaderService.isLoading.next(true)
      }
    })
    const token = localStorage.getItem('access_token');
    if (token) {
      // FormData bodies (file uploads, e.g. AttachmentService.upload) must NOT
      // get Content-Type forced to application/json here - the browser needs
      // to set its own 'multipart/form-data; boundary=...' header, which only
      // happens if Content-Type is left untouched. Forcing it to
      // application/json was the actual root cause of AttachmentController's
      // "Invalid file." errors: the request body was always correctly
      // multipart-encoded, but this interceptor's header override told the
      // server to expect JSON instead, so IFormFile/Request.Form always came
      // back empty regardless of anything on the backend.
      const headers: { [name: string]: string } = {
        'Authorization': `Bearer ${token}`,
      };
      if (!(request.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }
      request = request.clone({ setHeaders: headers })
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
         let errorMsg = '';
         if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
         } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
         }
         console.log(errorMsg);
         return throwError(()=>errorMsg);
      }),
      finalize(()=>{
        this.loaderService.isLoading.next(false)
      })
)
      
  }




}