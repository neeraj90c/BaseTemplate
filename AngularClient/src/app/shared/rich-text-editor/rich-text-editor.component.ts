import { Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
declare var RichTextEditor: any;
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit {

  @Output() submit: EventEmitter<{ value: string, clearText: () => void }> = new EventEmitter<{ value: string, clearText: () => void }>();

  onSubmit() {
    this.submit.emit({
      value: this.RTE.getHTML(),
      clearText: () => this.clearEditor()
    });
  }
  ngOnInit(): void {
    this.RTE = new RichTextEditor('#rteEditor')
    this.RTE.setHTML('')
  }

  clearEditor() {
    this.RTE.setHTML('')

  }
  RTE!: any



}
