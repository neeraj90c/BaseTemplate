import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
declare var RichTextEditor: any;
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit{

  @Output() submit : EventEmitter<string> = new EventEmitter<string>();

onSubmit() {
  this.submit.emit(this.RTE.getHTML())
}
 ngOnInit(): void {
   this.RTE = new RichTextEditor('#rteEditor')
   this.RTE.setHTML('')
 }
 RTE!:any



}
