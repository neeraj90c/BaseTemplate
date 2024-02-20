import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PdfGeneratorService } from '../pdf-generator/pdf-generator';

@Component({
  selector: 'app-color-datatable',
  templateUrl: './color-datatable.component.html',
  styleUrls: ['./color-datatable.component.scss']
})
export class ColorDatatableComponent {
  constructor(private pdfGeneratorService: PdfGeneratorService) { }
  currentPage: number = 1;
  totalPages: number = 0;
  selectedPageSize: number = 10;
  sortingColumn: string = '';
  sortingOrder: 'asc' | 'desc' = 'asc'; // Initial sorting order
  loading = true
  WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
  filteredData!: any[] | undefined;

  //WCColors = ["c584d3", "a084d2", "60a5e8", "60d9d9", "5ce7a1", "aae272", "fce153", "f8c459", "febc5a", "eb8a5b"];
  //filteredData: any[] = [];

  @Input() columns!: { colName: string, colData: string, enableCurrency?: boolean, isDate?: boolean }[];
  @Input() tableData!: any[];
  @Input() enableCheckboxColumn: boolean = false;
  @Input() checkboxColumnLabel: string = 'Select';
  @Input() enableActionColumn: boolean = false;
  @Input() actionColumnLabel: string = 'Actions';
  @Input() actionOptions: { actionName: string, actionIcon: string }[] = [];
  @Input() checkboxStateBinding: string = 'isActive';
  @Input() enableBadge: string = '';

  @Output() checkboxChange: EventEmitter<{ rowData: any, isChecked: boolean }> = new EventEmitter<{ rowData: any, isChecked: boolean }>();
  @Output() actionClick: EventEmitter<any> = new EventEmitter<{ actionName: string, rowData: any }>();
  startingSerialNumber: any;

  ngOnInit(): void {
    this.calculateStartingSerialNumber()
    this.calculateTotalPages();
    this.updateFilteredData();
    this.tableData.forEach((item, index) => {
      item.srno = this.startingSerialNumber + index;
    });

  }

  ngOnChanges(): void {
    this.calculateTotalPages();
    this.updateFilteredData();
  }
  calculateStartingSerialNumber(): void {
    this.tableData.map(i => {
      i.SrNo
    })
  }

  calculateTotalPages(): void {
    this.totalPages = Math.ceil(this.tableData?.length / this.selectedPageSize);
  }

  updateFilteredData(): void {
    const startIndex = (this.currentPage - 1) * this.selectedPageSize;
    this.filteredData = this.tableData?.slice(startIndex, startIndex + this.selectedPageSize);
    setTimeout(() => {
      this.loading = false
    }, 2200)
  }

  goToFirstPage(): void {
    this.currentPage = 1;
    this.updateFilteredData();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredData();
    }
  }

  getPagesToShow(): number[] {
    const totalPagesToShow = 5;
    const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
    const startPage = Math.max(1, this.currentPage - halfTotalPagesToShow);
    const endPage = Math.min(this.totalPages, startPage + totalPagesToShow - 1);

    // If there are many pages, adjust the range to show only a subset
    if (this.totalPages > totalPagesToShow) {
      if (this.currentPage <= halfTotalPagesToShow + 1) {
        return Array.from({ length: totalPagesToShow }, (_, i) => i + 1);
      } else if (this.currentPage >= this.totalPages - halfTotalPagesToShow) {
        return Array.from({ length: totalPagesToShow }, (_, i) => this.totalPages - totalPagesToShow + i + 1);
      } else {
        return Array.from({ length: totalPagesToShow }, (_, i) => startPage + i);
      }
    } else {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  }


  goToNumberPage(pageNumber: number): void {
    if (pageNumber > 0 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.updateFilteredData();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredData();
    }
  }

  goToLastPage(): void {
    this.currentPage = this.totalPages;
    this.updateFilteredData();
  }

  onPageSizeChanged(event: any): void {
    this.selectedPageSize = +event.target.value;
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateFilteredData();
  }

  onCheckboxChange(row: any): void {
    const isChecked = row[this.checkboxStateBinding];
    const rowData = row['rowData'];
    this.checkboxChange.emit({ rowData, isChecked });
  }

  actionButtonClick(actionName: any, rowData: any): void {
    this.actionClick.emit({ actionName, rowData });
  }

  sortData(column: string): void {
    // Toggle sorting order if the same column is clicked again
    if (this.sortingColumn === column) {
      this.sortingOrder = this.sortingOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortingColumn = column;
      this.sortingOrder = 'asc'; // Reset sorting order when a new column is selected
    }

    // Sort data based on the selected column and sorting order
    this.tableData.sort((a, b) => {
      if (a[column] < b[column]) return this.sortingOrder === 'asc' ? -1 : 1;
      if (a[column] > b[column]) return this.sortingOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Update filtered data and reset current page to 1 after sorting
    this.currentPage = 1;
    this.updateFilteredData();
  }

  generatePDF() {
    console.log('Button clicked. Generating PDF...');
    this.pdfGeneratorService.generatePDF('TechnoTech ERP', this.tableData, this.columns);
  }

  isNumber(data: any): boolean {
    return !isNaN(data)
  }

}
