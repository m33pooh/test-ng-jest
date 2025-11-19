import { Component, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';
import { DocumentService } from '../services/document.service';
import { DocumentStatus } from '../models/document-status.enum';
import { DocumentListComponent } from './document-list.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DocumentListComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {

  currentUser: Signal<User>;
  pendingFirstApproval$: Signal<Document[]>;
  pendingSecondApproval$: Signal<Document[]>;
  mySubmissions$: Signal<Document[]>;

  constructor(private documentService: DocumentService) {
    this.currentUser = this.documentService.getCurrentUser();

    const allDocs = this.documentService.getDocuments();

    this.pendingFirstApproval$ = computed(() =>
      allDocs().filter(d => d.status === DocumentStatus.PENDING_FIRST)
    );

    this.pendingSecondApproval$ = computed(() =>
      allDocs().filter(d => d.status === DocumentStatus.PENDING_SECOND)
    );

    this.mySubmissions$ = computed(() =>
      allDocs().filter(d => d.submittedBy.email === this.currentUser().email)
    );
  }
}
