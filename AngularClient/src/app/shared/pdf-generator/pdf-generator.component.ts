// pdf-generator.component.ts

import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Import the autotable plugin
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-pdf-generator',
    templateUrl: './pdf-generator.component.html',
})
export class PdfGeneratorComponent {
    @Input() pdfFileName: string = 'generated-pdf';
    @Input() data: any[] = [];
    @ViewChild('dataTable') pdfTableContainer!: ElementRef;
    @Input() columns!: any[]
    @ViewChild('tableRef') tableRef!: ElementRef;

    loading = false;

    ngAfterViewInit(): void {
        // You can access the rendered HTML table here using this.pdfTableContainer.nativeElement
    }

    startGenerating() {
        this.loading = true
        setTimeout(() => {
            this.generatePDF()
        }, 1500);
    }
    generatePDF(): void {
        const pdf = new jsPDF();

        // Access the rendered HTML table
        const table = this.pdfTableContainer.nativeElement.querySelector('table');
        const columnStyles = {
            0: { cellWidth: 40, minCellWidth: 30 }, // Set the width for the first column
            1: { cellWidth: 50, minCellWidth: 50 }, // Set the width for the second column
            2: { cellWidth: 40, minCellWidth: 40 }, // Set the width for the third column
        };

        // Use addHTML method to add the HTML table to the PDF
        (pdf as any).autoTable({
            html: table,
            styles: {
                fontSize: 9,
                cellPadding: { left: 0, right: 1, top: 1, bottom: 0 },
                columnStyles: columnStyles
            },
        });

        this.loading = false
        pdf.save(this.pdfFileName + '.pdf');
    }

    printTable(): void {
        const table = this.pdfTableContainer.nativeElement.querySelector('table');
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write('<html><head><title>TechnoTech ERP</title></head><body>');
            const stylesheets = document.head.getElementsByTagName('link');
            for (let i = 0; i < stylesheets.length; i++) {
                printWindow.document.write(stylesheets[i].outerHTML);
            }
            const styles = document.head.getElementsByTagName('style');
            for (let i = 0; i < styles.length; i++) {
                const styleClone = printWindow.document.createElement('style');
                styleClone.innerHTML = styles[i].innerHTML;
                printWindow.document.head.appendChild(styleClone);
            }

            printWindow.document.write(table.outerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.document.body.onload = () => {
                printWindow.print();
            };
        }
    }


    exportToExcel(): void {
        const table = this.tableRef.nativeElement;
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Save the file
        XLSX.writeFile(wb, 'exported-data.xlsx');
    }

}
