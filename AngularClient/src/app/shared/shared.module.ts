import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ColorTableComponent } from './color-table/color-table.component';
import { LoaderComponent } from './loader/loader.component';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal/confirm-delete-modal.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartModule } from 'angular-highcharts';
import { GraphicalHeaderComponent } from './graphical-header/graphical-header.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ExpandingTableSkeletonLoaderComponent } from './expanding-table-skeleton-loader/expanding-table-skeleton-loader.component';
import { ToastrModule } from 'ngx-toastr';
import { MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';





@NgModule({
  declarations: [
    ColorTableComponent,
    LoaderComponent,
    ConfirmDeleteModalComponent,
    GraphicalHeaderComponent,
    PageNotFoundComponent,
    RichTextEditorComponent,
    PaginationComponent,
    ExpandingTableSkeletonLoaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ChartModule,
    NgxSkeletonLoaderModule,
    MatSlideToggleModule,
    MatTableModule,
    ToastrModule
  ],
  exports: [
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ColorTableComponent,
    LoaderComponent,
    NgbModule,
    ChartModule,
    GraphicalHeaderComponent,
    PageNotFoundComponent,
    RichTextEditorComponent,
    PaginationComponent,
    NgxSkeletonLoaderModule,
    ExpandingTableSkeletonLoaderComponent,
    MatSlideToggleModule,
    MatTableModule,
    ToastrModule
  ]
})
export class SharedModule { }
