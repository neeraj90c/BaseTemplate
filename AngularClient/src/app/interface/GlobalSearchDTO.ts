export interface GlobalSearchDTO {
    filteredText: string;
    filterSize: number;
    searchId: number;
    searchValue: string;
    valueType: string;
    partDetail: string;
    workOrderDetail: string;
    workItemDetail: string;
  }
  
  export interface SearchResultList {
    searchResult: GlobalSearchDTO[];
  }

  export interface WorkItem {
    workitemId: number;
    workitemName: string;
  }
  
  export interface WorkOrder {
    workOrderId: string;
    workOrderName: string;
    workItems: WorkItem[];
  }
  
  export interface GlobalSearchList {
    partId: string;
    partName: string;
    workOrders: WorkOrder[];
  }
  