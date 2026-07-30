import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AttachmentService } from 'src/app/services/attachment.service';
import { ConfirmmodalserviceService } from 'src/app/shared/confirm-delete-modal/confirmmodalservice.service';
import { AllowedExtensionDTO, AttachmentDTO } from 'src/app/interface/attachment.interface';

// Used on screens where a real MasterId already exists (view-ticket today).
// Unlike AttachmentPickerComponent, this uploads immediately on file select -
// there's no "staging" step needed since the record it attaches to is real.
@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent implements OnInit, OnChanges {
  @Input() masterId!: number;
  @Input() masterType!: string;
  @Input() actionUser!: string;

  attachments: AttachmentDTO[] = [];
  allowedExtensions: AllowedExtensionDTO[] = [];
  isLoading = false;
  uploadingCount = 0;

  constructor(
    private _attachmentService: AttachmentService,
    private confirmModal: ConfirmmodalserviceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._attachmentService.getAllowedExtensions().subscribe(res => {
      this.allowedExtensions = res?.items ?? [];
    });
    this.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // masterId can arrive after the component is first created (e.g. the
    // host component resolves it async from a route param) - reload once it
    // actually has a value.
    if (changes['masterId'] && !changes['masterId'].firstChange) {
      this.refresh();
    }
  }

  get acceptAttribute(): string {
    return this.allowedExtensions.map(x => x.extension).join(',');
  }

  refresh(): void {
    if (!this.masterId || !this.masterType) return;

    this.isLoading = true;
    this._attachmentService.getByMaster(this.masterType, this.masterId).subscribe({
      next: res => {
        this.attachments = res?.items ?? [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.toastr.error('Failed to load attachments.');
      }
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    Array.from(input.files).forEach(file => this.uploadFile(file));

    input.value = '';
  }

  private uploadFile(file: File): void {
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

    this.uploadingCount++;
    this._attachmentService.upload(file, this.masterId, this.masterType, '', this.actionUser).subscribe({
      next: () => {
        this.uploadingCount--;
        this.toastr.success(`${file.name} uploaded.`);
        this.refresh();
      },
      error: () => {
        this.uploadingCount--;
        this.toastr.error(`Failed to upload ${file.name}.`);
      }
    });
  }

  // Browsers only have a native viewer for these - everything else (docx,
  // xlsx, zip, ...) has no in-browser renderer, so there's no point asking
  // the server for an inline response for those; they'd just download anyway.
  private static readonly InlineViewableExtensions = new Set([
    '.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.jfif', '.pdf'
  ]);

  isViewableInline(attachment: AttachmentDTO): boolean {
    return AttachmentListComponent.InlineViewableExtensions.has((attachment.extension || '').toLowerCase());
  }

  // Single action, smart behavior: images/PDFs open in a new tab so the user
  // can actually look at them; everything else downloads, since there's
  // nothing to "view" in-browser for a .docx or .zip anyway.
  openAttachment(attachment: AttachmentDTO): void {
    const url = this.isViewableInline(attachment)
      ? this._attachmentService.getViewUrl(attachment.guid)
      : this._attachmentService.getDownloadUrl(attachment.guid);
    window.open(url, '_blank');
  }

  delete(attachment: AttachmentDTO): void {
    this.confirmModal.openSwalModal(attachment.fileName, attachment).subscribe(res => {
      if (!res) return;

      this._attachmentService.delete({ attachmentId: res.attachmentId, actionUser: this.actionUser }).subscribe({
        next: () => {
          this.toastr.success('Attachment deleted.');
          this.refresh();
        },
        error: () => this.toastr.error('Failed to delete attachment.')
      });
    });
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
