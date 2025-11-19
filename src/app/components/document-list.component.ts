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

  constructor() { }

  ngOnInit(): void {
  }

}
