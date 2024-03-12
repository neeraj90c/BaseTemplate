import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalesleadService } from '../saleslead.service';
import { LeadActivityDTO, LeadAsigneeDTO, SalesLeadDTO } from 'src/app/interface/leadgeneration.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {
TicketAsigneeSaveAsignee() {
throw new Error('Method not implemented.');
}
detailActivityDivVisible: boolean = false;
assignTicketToUserDivVisible: boolean = false;
commentForm = new FormGroup({});
SupportTicket_ReOpen() {
throw new Error('Method not implemented.');
}
OpenEditTicketModal() {
throw new Error('Method not implemented.');
}
SupportTicket_Forceclose() {
throw new Error('Method not implemented.');
}
AssignTicketToUserOnClick() {
this.assignTicketToUserDivVisible = !this.assignTicketToUserDivVisible
}
TakeOverButtonOnClick() {
throw new Error('Method not implemented.');
}
toggleCommentDialogOnClick() {
this.detailActivityDivVisible = !this.detailActivityDivVisible
}

  constructor(private route: ActivatedRoute, private _salesleadService: SalesleadService,private sanitizer: DomSanitizer) { }
  leadId: number = 0
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.leadId = +params['id'];
      this.getLeadDetailById(this.leadId)
    });
  }
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];

  leadDetail!: SalesLeadDTO
  leadAssigneeForm = new FormGroup({})
  assigneeList:LeadAsigneeDTO[] = []
  leadActivity: LeadActivityDTO[]=[]
 
  getLeadDetailById(id: number) {
    this._salesleadService.getSalesLeadByLeadId(id).subscribe(res => {
      this.leadDetail = res
      this._salesleadService.getLeadActivityByLeadId(id).subscribe(res=>{
        this.leadActivity = res.items
      })
      this._salesleadService.getLeadAssigneesByLeadId(id).subscribe(res=>{
        this.assigneeList = res.items
        
      })
      
    })
  }

  activityLoading: any;
  returnSanitizedDom(data: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(data)
  }

handleRTEsubmit(event: { value: string, clearText: () => void, setHtml: (text: string) => void }) {
  
}

  


}
