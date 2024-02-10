import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges{


  @Input() rowData!: any;
  @Input() EnablePageSize: boolean = false
  @Input() EnableNavigation: boolean = false



  @Output() pageSizeChanged: EventEmitter<{currentPage:number,pageSize:number}> = new EventEmitter<{currentPage:number,pageSize:number}>();

  currentPage: number = 1
  totalPages: number = 0
  pageSize: number = 10
  



  onPageSizeChanged(event: any) {
    const selectedValue = event.target.value;
    this.pageSize = selectedValue
    this.pageSizeChanged.emit({currentPage:1,pageSize:selectedValue})
  }

  goToFirstPage() {
    if (this.currentPage !== 1) {
      this.currentPage = 1
      this.pageSizeChanged.emit({currentPage:this.currentPage,pageSize:this.pageSize})
    }

  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage = this.currentPage - 1;
      this.pageSizeChanged.emit({currentPage:this.currentPage,pageSize:this.pageSize})

    }
  }


  getPagesToShow(): number[] {
    const numPagesToShow = 5;
    const halfNumPages = Math.floor(numPagesToShow / 2);
    const startPage = Math.max(1, this.currentPage - halfNumPages);
    const endPage = Math.min(this.totalPages, startPage + numPagesToShow - 1);

    if (startPage <= this.currentPage && this.currentPage <= endPage) {
      return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    }
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToNumberPage(data: any) {
    this.currentPage = data
    this.pageSizeChanged.emit({currentPage:this.currentPage,pageSize:this.pageSize})
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage = this.currentPage + 1;
      this.pageSizeChanged.emit({currentPage:this.currentPage,pageSize:this.pageSize})

    }
  }

  goToLastPage() {
    if (this.currentPage !== this.totalPages) {
      this.currentPage = this.totalPages
      this.pageSizeChanged.emit({currentPage:this.currentPage,pageSize:this.pageSize})

    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if(this.rowData.length > 0){
      
      this.totalPages = Math.ceil(this.rowData[0].totalCount / this.rowData[0].pageSize)
      this.currentPage = this.rowData[0].pageNo
      this.pageSize = this.rowData[0].pageSize
    }
  }
}
