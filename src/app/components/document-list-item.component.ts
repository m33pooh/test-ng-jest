import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { DocumentService } from '../services/document.service';
import { DocumentStatus } from '../models/document-status.enum';

@Component({
  selector: 'app-document-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './document-list-item.component.html'
})
export class DocumentListItemComponent implements OnInit {

  @Input() document!: Document;
  DocumentStatus = DocumentStatus;

  constructor(private documentService: DocumentService) { }

  ngOnInit(): void {
  }

  approve() {
    if (this.document.status === DocumentStatus.PENDING_FIRST) {
      this.documentService.firstApprove(this.document);
    } else if (this.document.status === DocumentStatus.PENDING_SECOND) {
      this.documentService.secondApprove(this.document);
    }
  }

  reject() {
    this.documentService.rejectDocument(this.document);
  }
}
