import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-datatable',
  templateUrl: './color-datatable.component.html',
  styleUrls: ['./color-datatable.component.scss']
})
export class ColorDatatableComponent {
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.dtOptions = {
      columnDefs: [{ "width": "5%", "targets": [0, 0] }, { "width": "8%", "targets": [1, 2, 3, 5, 6, 7, 8, 9] }, { "width": "34%", "targets": [4] }],
      dom: 'Bfrtip',
      // buttons: [
      //     'copy', 'csv', 'excel', 'pdf', 'print'
      // ]
  }
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
