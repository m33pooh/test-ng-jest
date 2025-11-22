import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { DocumentListItemComponent } from './document-list-item.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentListItemComponent],
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];
  @Input() currentUser!: User;

  selectedDocuments = new Set<Document>();

  constructor() { }

  ngOnInit(): void {
  }

  get allSelected(): boolean {
    return this.documents.length > 0 && this.selectedDocuments.size === this.documents.length;
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.documents.forEach(doc => this.selectedDocuments.add(doc));
    } else {
      this.selectedDocuments.clear();
    }
  }

  onDocumentToggle(doc: Document, selected: boolean) {
    if (selected) {
      this.selectedDocuments.add(doc);
    } else {
      this.selectedDocuments.delete(doc);
    }
  }

  isDocumentSelected(doc: Document): boolean {
    return this.selectedDocuments.has(doc);
  }

}
