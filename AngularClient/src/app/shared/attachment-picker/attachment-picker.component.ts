import { Component, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from 'src/app/services/attachment.service';
import { AllowedExtensionDTO } from 'src/app/interface/attachment.interface';

// Used on *create* forms (create-ticket, lead-generation) where there's no
// TicketId/LeadId yet to attach anything to. Only stages picked files
// client-side and validates them against the allowed-extensions config -
// nothing here ever calls the upload endpoint. The parent form reads
// `files` (via getFiles() or the (selectionChange) output) once its own
// save succeeds and it has a real MasterId to upload against.
@Component({
  selector: 'app-attachment-picker',
  templateUrl: './attachment-picker.component.html',
  styleUrls: ['./attachment-picker.component.scss']
})
export class AttachmentPickerComponent {
  @Output() selectionChange = new EventEmitter<File[]>();

  files: File[] = [];
  allowedExtensions: AllowedExtensionDTO[] = [];

  constructor(
    private _attachmentService: AttachmentService,
    private toastr: ToastrService
  ) {
    this._attachmentService.getAllowedExtensions().subscribe(res => {
      this.allowedExtensions = res?.items ?? [];
    });
  }

  get acceptAttribute(): string {
    return this.allowedExtensions.map(x => x.extension).join(',');
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    Array.from(input.files).forEach(file => this.tryAddFile(file));

    // Allows re-selecting the same file again later (browsers otherwise
    // suppress the change event if the file list looks unchanged).
    input.value = '';
  }

  private tryAddFile(file: File): void {
    const extension = this.getExtension(file.name);
    const allowed = this.allowedExtensions.find(x => x.extension.toLowerCase() === extension);

    if (!allowed) {
      this.toastr.error(`"${extension}" files are not allowed.`);
      return;
    }

    if (file.size > allowed.maxSizeBytes) {
      this.toastr.error(`${file.name} exceeds the ${this.formatSize(allowed.maxSizeBytes)} limit for ${extension} files.`);
      return;
    }

    if (this.files.some(f => f.name === file.name && f.size === file.size)) {
      this.toastr.warning(`${file.name} is already added.`);
      return;
    }

    this.files.push(file);
    this.selectionChange.emit(this.files);
  }

  // Same viewable-type list as AttachmentListComponent, but these files
  // haven't been uploaded yet - there's no GUID/server endpoint to hit, so
  // this opens a local blob URL instead. Never touches the backend.
  private static readonly InlineViewableExtensions = new Set([
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.jfif', '.pdf'
  ]);

  isViewableInline(file: File): boolean {
    return AttachmentPickerComponent.InlineViewableExtensions.has(this.getExtension(file.name));
  }

  viewFile(file: File): void {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
    // Give the new tab time to actually load the blob before freeing it -
    // this is a locally-created object URL, nothing server-side to clean up.
    setTimeout(() => URL.revokeObjectURL(url), 30000);
  }

  removeFile(index: number): void {
    this.files.splice(index, 1);
    this.selectionChange.emit(this.files);
  }

  clear(): void {
    this.files = [];
    this.selectionChange.emit(this.files);
  }

  getFiles(): File[] {
    return this.files;
  }

  formatSize(bytes: number): string {
    if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`;
    if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`;
    return `${bytes} B`;
  }

  private getExtension(fileName: string): string {
    const idx = fileName.lastIndexOf('.');
    return idx >= 0 ? fileName.substring(idx).toLowerCase() : '';
  }
}
