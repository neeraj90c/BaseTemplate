import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { ServerService } from '../services/server.service';
import { UserTimeTrack } from '../interface/UserTimeTrackingDTO';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private serverService: ServerService, private router: Router, private _userService: UserService) { }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Check if the user is authenticated using your service method
    const isAuthenticated = this.serverService.isAuthenticated();

    if (isAuthenticated) {
      return true; // User is authenticated, allow access.
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }





}
