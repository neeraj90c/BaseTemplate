import { Component, OnInit } from '@angular/core';
import { ServerService } from './services/server.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading:boolean = false;

  constructor(private serverService:ServerService, private loaderService:LoaderService){ }

  ngOnInit(): void {
    
  }

  isLoggedIn(): boolean {
    return this.serverService.isAuthenticated();
  }
}
