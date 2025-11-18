import { Component, Input, OnInit } from '@angular/core';
import { Document } from '../models/document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html'
})
export class DocumentListComponent implements OnInit {

  @Input() documents: Document[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
