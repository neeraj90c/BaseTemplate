import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading.subscribe(res => {
      this.isLoading = true
    })
  }


  isLoading = true

  
}
