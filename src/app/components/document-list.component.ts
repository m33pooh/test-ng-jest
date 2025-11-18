import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Document } from '../models/document.model';
import { DocumentListItemComponent } from './document-list-item.component';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [CommonModule, DocumentListItemComponent],
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
