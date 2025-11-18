import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DocumentService } from '../services/document.service';
import { DocumentStatus } from '../models/document-status.enum';

@Component({
  selector: 'app-document-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-submission.component.html'
})
export class DocumentSubmissionComponent {

  submissionForm: FormGroup;

  constructor(private fb: FormBuilder, private documentService: DocumentService) {
    this.submissionForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.submissionForm.valid) {
      const currentUser = this.documentService.getCurrentUser()();
      this.documentService.addDocument({
        name: this.submissionForm.value.title,
        size: '1.0 MB', // Mock size
        type: 'General', // Mock type
        submittedBy: currentUser,
        submittedDate: new Date().toLocaleDateString('en-US'),
        status: DocumentStatus.PENDING_FIRST
      });
      this.submissionForm.reset();
    }
  }
}
