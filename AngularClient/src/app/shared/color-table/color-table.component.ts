import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-table',
  templateUrl: './color-table.component.html',
  styleUrls: ['./color-table.component.scss']
})
export class ColorTableComponent implements OnInit{
  ngOnInit(): void {
    
  }
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
  @Input() columns!: {colName:string,colData:string}[];
  @Input() tableData: any[] = [];
  @Input() enableCheckboxColumn: boolean = false;
  @Input() checkboxColumnLabel: string = 'Select';
  @Input() enableActionColumn: boolean = false;
  @Input() actionColumnLabel: string = 'Actions';
  @Input() actionOptions: { actionName: string, actionIcon: string }[] = [];
  @Input() checkboxStateBinding: string = 'isActive';
  @Input() enableBadge: string=''

  @Output() checkboxChange: EventEmitter<{ rowData: any, isChecked: boolean }> = new EventEmitter<{ rowData: any, isChecked: boolean }>();
  @Output() actionClick: EventEmitter<any> = new EventEmitter<{ actionName: string, rowData: any }>();


  onCheckboxChange(row: any) {
    const isChecked = row[this.checkboxStateBinding];
    const rowData = row['rowData']
    this.checkboxChange.emit({ rowData, isChecked });
  }


  actionButtonClick(actionName: any, rowData: any) {
    this.actionClick.emit({ actionName, rowData });
  }
  
}
