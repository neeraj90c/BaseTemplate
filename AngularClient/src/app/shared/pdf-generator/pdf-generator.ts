// pdf-generator.service.ts

import { ElementRef, Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable'; // Import the autotable plugin

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  generatePDF(pdfFileName: string, data: any[], columns: any[]): void {

    
    const pdf = new jsPDF();

    // Create headers from the 'columns' array
    const headers = columns.map(column => column.colName);
    const dataKeys = columns.map(column => column.colData);

    // Create body from the 'data' array using the keys from 'columns'
    const body = data.map(item => dataKeys.map(key => item[key]));

    // Set individual column widths and enable text wrapping
    const columnStyles:{}[] = [];
    columns.forEach((column, index) => {
      columnStyles[index] = { cellWidth: 'wrap', maxCellWidth: '20', minCellWidth: '10', };
    });

    // Use addPlugin method to add the autotable plugin
    (pdf as any).autoTable({
      head: [headers],
      body: body,
      startY: 10,
      theme: 'grid',
    });

    pdf.save(pdfFileName + '.pdf');
  }
}
