import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var RichTextEditor: any;
declare var rteconfig: any;
@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.scss'],
})
export class RichTextEditorComponent implements OnInit {
  RTE!: any
  constructor(private http: HttpClient) {

  }
  @Output() submit: EventEmitter<{ value: string, clearText: () => void, setHtml: (text: string) => void }> = new EventEmitter<{ value: string, clearText: () => void, setHtml: (text: string) => void }>();
  @Input() setRTEHtml: string = ''

  @Input() customStyle: { [key: string]: string } = {};

  onSubmit() {
    this.submit.emit({
      value: this.RTE.getHTML(),
      clearText: () => this.clearEditor(),
      setHtml: (text) => this.RTE.setHtml(text)
    });
  }
  ngOnInit(): void {
    this.RTE = new RichTextEditor('#rteEditor')
    this.RTE.setHTML('')
    this.RTE.config.file_upload_handler = this.customFileUploadHandler.bind(this);
  }

  clearEditor() {
    this.RTE.setHTML('')
  }
  public setHtml(text: string) {
    this.RTE.setHTML(text)
  }
  ngAfterViewInit() {
    console.log('ngAfterViewInit');
    this.setHtml(this.setRTEHtml)
  }

  handleFileupload(e: any) {
    console.log(e);

  }
  uploadhandlerpath = environment.apiURL+'/rte/upload'

  // customFileUploadHandler(file: File,) {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file, file.name);

  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer YOUR_JWT_TOKEN`,
  //   });

  //    this.http.post(this.uploadhandlerpath, formData, { headers }).subscribe(res=>{
  //     console.log(res);
      
  //    });
  // }


customFileUploadHandler(file: File,callback: (url: string | null, error?: string) => void,optionalIndex?: number,optionalFiles?: File[]): void {
  function append(parent: HTMLElement, tagname: string, csstext?: string): HTMLElement {
    const tag = parent.ownerDocument.createElement(tagname);
    if (csstext) tag.style.cssText = csstext;
    parent.appendChild(tag);
    return tag;
  }

  let uploadCancelled = false;

  const dialogOuter = append(
    document.body,
    'div',
    'display:flex;align-items:center;justify-content:center;z-index:999999;position:fixed;left:0px;top:0px;width:100%;height:100%;background-color:rgba(128,128,128,0.5)'
  );
  const dialogInner = append(
    dialogOuter,
    'div',
    'background-color:white;border:solid 1px gray;border-radius:15px;padding:15px;min-width:200px;box-shadow:2px 2px 6px #7777'
  );

  const line1 = append(dialogInner, 'div', 'text-align:center;font-size:1.2em;margin:0.5em;');
  line1.innerText = 'Uploading...';

  let totalSize = file.size;
  let sentSize = 0;

  if (optionalFiles && optionalFiles.length > 1) {
    totalSize = optionalFiles.reduce((sum, f) => sum + f.size, 0);
    sentSize = optionalFiles.slice(0, optionalIndex!).reduce((sum, f) => sum + f.size, 0);

    console.log(totalSize, optionalIndex, optionalFiles);
    line1.innerText = `Uploading... ${optionalIndex! + 1}/${optionalFiles.length}`;
  }

  const line2 = append(dialogInner, 'div', 'text-align:center;font-size:1.0em;margin:0.5em;');
  line2.innerText = '0%';

  const progressBar = append(dialogInner, 'div', 'border:solid 1px gray;margin:0.5em;');
  const progressBg = append(progressBar, 'div', 'height:12px');

  const line3 = append(dialogInner, 'div', 'text-align:center;font-size:1.0em;margin:0.5em;');
  const btn = append(line3, 'button') as HTMLButtonElement;
  btn.className = 'btn btn-primary';
  btn.innerText = 'Cancel';
  btn.onclick = function () {
    uploadCancelled = true;
    // Ideally, you would have a way to cancel the HTTP request
    // This could be achieved using RxJS' takeUntil or AbortController
  };

  const formData: FormData = new FormData();
  formData.append('file', file, file.name);
  // formData.append('name', file.name); // Include the file name
  // formData.append('type', file.type); // Include the file type
  // formData.append('Content-Disposition', 'attachment; SASADASname=' + file.name);

  console.log(file, file.name);



  this.http.post(this.uploadhandlerpath, file,{
    headers: new HttpHeaders({
      'enctype': 'multipart/form-data'
    })
  }).subscribe({
    next: (event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        const percent = Math.floor(100 * (sentSize + (event.loaded ?? 0)) / totalSize);
        line2.innerText = `${percent}%`;
        progressBg.style.cssText = `background-color:green;width:${(percent * progressBar.offsetWidth / 100)}px;height:12px;`;
      } else if (event.type === HttpEventType.Response) {
        dialogOuter.parentNode?.removeChild(dialogOuter);
        if (event.status === 200 && event.body?.startsWith('READY:')) {
          console.log('File uploaded to ' + event.body.substring(6));
          callback(event.body.substring(6));
        } else if (event.body?.startsWith('ERROR:')) {
          callback(null, `http-error-${event.body.substring(6)}`);
        } else {
          callback(null, `http-error-${event.status}`);
        }
      }
    },
    error: err => {
      dialogOuter.parentNode?.removeChild(dialogOuter);
      callback(null, err.message);
    },
  });
}

ngOnDestroy() {
}

}
