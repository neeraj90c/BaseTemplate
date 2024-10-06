import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import Quill from 'quill';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quill-editor',
  templateUrl: './quill-editor.component.html',
  styleUrls: ['./quill-editor.component.scss']
})
export class QuillEditorComponent implements OnInit, OnDestroy, AfterViewInit {
  quillEditor: any; // Reference to the Quill editor instance
  htmlContent: string = ''; // HTML content of the editor
  @Input() setRTEHtml: string = ''

  @Output() submit: EventEmitter<{ value: string, clearText: () => void, setHtml: (text: string) => void }> = new EventEmitter<{ value: string, clearText: () => void, setHtml: (text: string) => void }>();


  constructor(private http: HttpClient) { }
  ngAfterViewInit(): void {
    this.setHtmlFromDatabase(this.setRTEHtml)
  }

  ngOnInit(): void {
    this.initializeQuillEditor();

  }

   toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];
setHtmlFromDatabase(htmlString: string): void {
    if (this.quillEditor) {
        // Clear the editor first if needed
        this.quillEditor.setText(''); 
        
        // Set the HTML content
        this.quillEditor.clipboard.dangerouslyPasteHTML(0, htmlString);
    }
}

  // Initialize the Quill editor
  initializeQuillEditor(): void {
    this.quillEditor = new Quill('#editor-container', {
      theme: 'snow', // Choose 'snow' or 'bubble' theme
      modules: {
        toolbar: this.toolbarOptions
      }
    });

    // Set up a listener to update the htmlContent whenever the content changes
    this.quillEditor.on('text-change', () => {
      this.htmlContent = this.quillEditor.root.innerHTML;
    });
  }
  uploadhandlerpath = environment.apiURL + '/rte/upload'

  // Custom image upload handler
  customImageHandler(): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = () => {
      const file = input.files ? input.files[0] : null;
      if (file) {
        const reader = new FileReader();
    
        // Read the file as a data URL
        reader.readAsDataURL(file);
        
        reader.onload = () => {

          const base64Image = reader.result as string;
          const range = this.quillEditor.getSelection();
    
          // Insert image using insertEmbed
          this.quillEditor.insertEmbed(range.index, 'image', base64Image);
    
          // After inserting, apply inline styles to the inserted image
          setTimeout(() => {
            const imgElement = this.quillEditor.root.querySelector(`img[src="${base64Image}"]`);
            if (imgElement) {
              imgElement.style.width = '80%';  // Set image width to 80%
              imgElement.style.height = 'auto'; // Maintain aspect ratio
            }
          }, 100);  // Slight delay to allow Quill to render the image

          // const base64Image = reader.result; // This will be a base64 encoded string
          // const range = this.quillEditor.getSelection(); // Get the current selection range
          
          // // Create a styled HTML image element
          // const styledImage = `<img width="80%" src="${base64Image}"  />`;
          
          // // Insert the styled image into the editor
          // this.quillEditor.clipboard.dangerouslyPasteHTML(range.index, styledImage); // Insert the base64 image

          
          // // Optionally move the cursor to the next line after the image
          // this.quillEditor.setSelection(range.index + 1); // Move the cursor to the next line
        };
    
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
          alert('Failed to read file: ' + error);
        };
      }
    };
    
    
  }

  applyWidthToImgTags(inputString: string): string {
    // Regular expression to find <img> tags
    const imgTagRegex = /<img\s+[^>]*src="[^"]*"[^>]*>/gi;
  
    // Replace each img tag found with modified img tag
    return inputString.replace(imgTagRegex, (imgTag) => {
      let modifiedImgTag = imgTag;
  
      // Check if width attribute exists, if not, add it
      if (!/width="[^"]*"/.test(imgTag)) {
        modifiedImgTag = modifiedImgTag.replace(/<img/, '<img width="80%"');
      } else {
        // If width exists, modify it to 80%
        modifiedImgTag = modifiedImgTag.replace(/width="[^"]*"/, 'width="80%"');
      }
  
      return modifiedImgTag;
    });
  }

  // Cleanup Quill editor on destroy
  ngOnDestroy(): void {
    if (this.quillEditor) {
      this.quillEditor.enable(false); // Disable the editor
    }
  }

  // Handle form submission if necessary
  onSubmit(): void {
    // You can emit this.htmlContent to your parent component or handle it here
    console.log(this.htmlContent); // Log or process the HTML content as needed
    const content = this.applyWidthToImgTags(this.quillEditor.root.innerHTML);

    this.submit.emit({
      value: content,
      clearText: () => this.clearEditor(),
      setHtml: (text) => this.quillEditor.setText(text)
    });
  }
  clearEditor(): void {
    this.quillEditor.setText(''); // Clears the editor content
  }

  uploadFile(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    formData.append('name', file.name); // Include the file name
    formData.append('type', file.type); // Include the file type

    return this.http.post(this.uploadhandlerpath, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      })
    });
  }
}