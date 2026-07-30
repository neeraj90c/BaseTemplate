import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  AllowedExtensionList,
  AttachmentDTO,
  AttachmentList,
  DeleteAttachmentDTO,
  UpdateAttachmentDTO
} from '../interface/attachment.interface';

// Thin wrapper around WebAPI/Controllers/Common/AttachmentController.cs.
// Generic on purpose - masterType/masterId identify which record (SalesLead,
// SupportTickets, ...) an attachment belongs to, so this one service backs
// every module's attachment UI rather than each module having its own.
@Injectable({
  providedIn: 'root'
})
export class AttachmentService {
  private readonly BaseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getAllowedExtensions(): Observable<AllowedExtensionList> {
    return this.http.get<AllowedExtensionList>(`${this.BaseURL}/attachment/AllowedExtensions`);
  }

  getByMaster(masterType: string, masterId: number): Observable<AttachmentList> {
    return this.http.get<AttachmentList>(`${this.BaseURL}/attachment/GetByMaster/${masterType}/${masterId}`);
  }

  upload(
    file: File,
    masterId: number,
    masterType: string,
    description: string,
    actionUser: string
  ): Observable<AttachmentDTO> {
    const formData = new FormData();
    formData.append('File', file, file.name);
    formData.append('MasterId', masterId.toString());
    formData.append('MasterType', masterType);
    formData.append('Description', description ?? '');
    formData.append('ActionUser', actionUser);

    return this.http.post<AttachmentDTO>(`${this.BaseURL}/attachment/Upload`, formData);
  }

  update(data: UpdateAttachmentDTO): Observable<AttachmentDTO> {
    return this.http.post<AttachmentDTO>(`${this.BaseURL}/attachment/UpdateAttachment`, data);
  }

  delete(data: DeleteAttachmentDTO): Observable<void> {
    return this.http.post<void>(`${this.BaseURL}/attachment/DeleteAttachment`, data);
  }

  // Builds the direct download URL rather than fetching bytes through
  // HttpClient - lets the browser handle the download/save-as natively.
  getDownloadUrl(guid: string): string {
    return `${this.BaseURL}/attachment/Download/${guid}`;
  }

  // Same endpoint, ?inline=true - server responds with Content-Disposition:
  // inline instead of attachment, so the browser renders the file directly in
  // the new tab instead of forcing Save As. Only worth using for types the
  // browser can actually render natively (images, PDF) - see
  // AttachmentListComponent.isViewableInline.
  getViewUrl(guid: string): string {
    return `${this.BaseURL}/attachment/Download/${guid}?inline=true`;
  }
}
