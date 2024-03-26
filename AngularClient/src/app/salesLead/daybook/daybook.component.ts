import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { SalesleadService } from '../saleslead.service';

@Component({
  selector: 'app-daybook',
  templateUrl: './daybook.component.html',
  styleUrls: ['./daybook.component.scss']
})
export class DaybookComponent implements OnInit {


  constructor(private _userService:UserService, private _salesLeadService:SalesleadService){}

  ngOnInit(): void {
    
  }



dataTableLoading: boolean = false;
SalesList!: any[];
handleActionClick($event: { actionName: string; rowData: any; }) {
throw new Error('Method not implemented.');
}
handleRedirect($event: { rowData: any; }) {
throw new Error('Method not implemented.');
}

}
