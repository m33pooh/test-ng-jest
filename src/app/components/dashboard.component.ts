import { Component, OnInit, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';
import { DocumentService } from '../services/document.service';
import { DocumentStatus } from '../models/document-status.enum';
import { DocumentListComponent } from './document-list.component';
import { DocumentSubmissionComponent } from './document-submission.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DocumentListComponent, DocumentSubmissionComponent],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  documents: Signal<Document[]>;
  users: User[] = [];
  currentUser: Signal<User>;

  constructor(private documentService: DocumentService) {
    this.currentUser = documentService.getCurrentUser();
    this.documents = computed(() => {
      const docs = documentService.getDocuments()();
      const user = this.currentUser();
      if (user.name === 'First Approver') {
        return docs.filter(d => d.status === DocumentStatus.PENDING_FIRST);
      }
      if (user.name === 'Second Approver') {
        return docs.filter(d => d.status === DocumentStatus.PENDING_SECOND);
      }
      return docs.filter(d => d.submittedBy.email === user.email);
    });
  }

  ngOnInit(): void {
    this.users = this.documentService.getUsers();
  }

}
