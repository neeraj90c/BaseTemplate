import { Component, OnInit } from '@angular/core';
declare var RichTextEditor: any;
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit{
 ngOnInit(): void {
   this.RTE = new RichTextEditor('#TemplateInstEditor')
 }
 RTE!:any

}
