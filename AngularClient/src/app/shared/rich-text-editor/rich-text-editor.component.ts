import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
declare var RichTextEditor: any;
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit {
  RTE!: any

  @Output() submit: EventEmitter<{ value: string, clearText: () => void, setHtml:(text:string) => void }> = new EventEmitter<{ value: string, clearText: () => void, setHtml: (text: string) => void }>();
  @Input() setRTEHtml :string = ''
  onSubmit() {
    this.submit.emit({
      value: this.RTE.getHTML(),
      clearText: () => this.clearEditor(),
      setHtml:(text)=> this.RTE.setHtml(text)
    });
  }
  ngOnInit(): void {
    this.RTE = new RichTextEditor('#rteEditor')
    this.RTE.setHTML('')
  }

  clearEditor() {
    this.RTE.setHTML('')
  }
  public setHtml(text:string){
    this.RTE.setHTML(text)
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.setHtml(this.setRTEHtml)
  }


  ngOnDestroy(){
  }

}
