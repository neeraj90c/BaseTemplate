import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      return jwtDecode.jwtDecode(token) // Note the use of `default` here
    } catch (error) {
      console.error('Error decoding JWT:', error);
      return null;
    }
  }
}
