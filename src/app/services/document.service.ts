import { Inject, Injectable, signal } from '@angular/core';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';
import { DocumentStatus } from '../models/document-status.enum';
import { ToastService } from './toast.service';
import { DATA_SERVICE_TOKEN } from '../app.config';
import { DataServiceInterface } from '../models/data-service.interface';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private users: User[] = [];
  private documents = signal<Document[]>([]);
  private currentUser = signal<User>({} as User);

  constructor(
    private toastService: ToastService,
    @Inject(DATA_SERVICE_TOKEN) private dataService: DataServiceInterface
  ) {
    this.users = this.dataService.getUsers();
    this.documents.set(this.dataService.getDocuments());
    if (this.users.length > 0) {
      this.currentUser.set(this.users[0]);
    }
  }

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

  addDocuments(documents: Document[]) {
    this.documents.update(docs => [...docs, ...documents]);
    this.toastService.show(`${documents.length} document(s) submitted successfully.`);
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
