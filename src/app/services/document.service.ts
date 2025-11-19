import { Injectable, signal } from '@angular/core';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';
import { DocumentStatus } from '../models/document-status.enum';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private users: User[] = [
    { name: 'John Smith', email: 'john.smith@company.com', avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=101' },
    { name: 'First Approver', email: 'sarah.johnson@company.com', avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=202' },
    { name: 'Second Approver', email: 'mike.davis@company.com', avatarUrl: 'https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=303' },
  ];

  private documents = signal<Document[]>([
    {
      name: 'Q4 Budget Report.pdf',
      size: '2.4 MB',
      type: 'Financial',
      submittedBy: this.users[0],
      submittedDate: 'Jan 15, 2025',
      status: DocumentStatus.PENDING_FIRST
    },
    {
      name: 'Marketing Strategy.docx',
      size: '1.8 MB',
      type: 'Marketing',
      submittedBy: this.users[0],
      submittedDate: 'Jan 16, 2025',
      status: DocumentStatus.PENDING_FIRST
    },
    {
      name: 'Sales Data Q1.xlsx',
      size: '3.1 MB',
      type: 'Sales',
      submittedBy: this.users[0],
      submittedDate: 'Jan 17, 2025',
      status: DocumentStatus.PENDING_SECOND
    },
    {
      name: 'HR Policy Update.pdf',
      size: '1.2 MB',
      type: 'HR',
      submittedBy: this.users[0],
      submittedDate: 'Jan 14, 2025',
      status: DocumentStatus.PENDING_SECOND
    },
    {
      name: 'Vendor Contract.pdf',
      size: '2.7 MB',
      type: 'Legal',
      submittedBy: this.users[0],
      submittedDate: 'Jan 15, 2025',
      status: DocumentStatus.APPROVED
    }
  ]);

  private currentUser = signal<User>(this.users[0]);

  constructor(private toastService: ToastService) { }

  getUsers(): User[] {
    return this.users;
  }

  getDocuments() {
    return this.documents.asReadonly();
  }

  getCurrentUser() {
    return this.currentUser.asReadonly();
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
  }

  addDocument(document: Document) {
    this.documents.update(docs => [...docs, document]);
    this.toastService.show('Document submitted successfully.');
  }

  firstApprove(document: Document) {
    this.documents.update(docs =>
      docs.map(d => d.name === document.name ? { ...d, status: DocumentStatus.PENDING_SECOND } : d)
    );
    this.toastService.show('Document approved. Sent to Second Approver.');
  }

  secondApprove(document: Document) {
    this.documents.update(docs =>
      docs.map(d => d.name === document.name ? { ...d, status: DocumentStatus.APPROVED } : d)
    );
    this.toastService.show('Final Approval granted.');
  }

  rejectDocument(document: Document) {
    this.documents.update(docs =>
      docs.map(d => d.name === document.name ? { ...d, status: DocumentStatus.REJECTED } : d)
    );
    this.toastService.show('Document rejected.');
  }
}
