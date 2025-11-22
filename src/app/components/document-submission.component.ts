import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from '../services/document.service';
import { DocumentStatus } from '../models/document-status.enum';
import { Document } from '../models/document.model';

@Component({
  selector: 'app-document-submission',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './document-submission.component.html'
})
export class DocumentSubmissionComponent {

  private fb = inject(FormBuilder);
  private documentService = inject(DocumentService);
  private router = inject(Router);

  submissionForm: FormGroup = this.fb.group({
    title: [''], // Title is optional if files are selected
    description: ['', Validators.required]
  });
  selectedFiles: FileList | null = null;

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    this.selectedFiles = element.files;
  }

  onSubmit() {
    if (this.submissionForm.valid) {
      const currentUser = this.documentService.getCurrentUser()();
      const description = this.submissionForm.value.description;
      const title = this.submissionForm.value.title;

      if (this.selectedFiles && this.selectedFiles.length > 0) {
        const newDocuments: Document[] = [];
        for (let i = 0; i < this.selectedFiles.length; i++) {
          const file = this.selectedFiles[i];
          newDocuments.push({
            name: file.name,
            size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
            type: this.getFileType(file.name),
            submittedBy: currentUser,
            submittedDate: new Date().toLocaleDateString('en-US'),
            status: DocumentStatus.PENDING_FIRST
          });
        }
        this.documentService.addDocuments(newDocuments);
      } else if (title) {
        // Fallback: Create single document from Title if no file selected
        this.documentService.addDocument({
          name: title,
          size: '1.0 MB', // Mock size
          type: 'General', // Mock type
          submittedBy: currentUser,
          submittedDate: new Date().toLocaleDateString('en-US'),
          status: DocumentStatus.PENDING_FIRST
        });
      } else {
        // Validation error: Either Title or File is required
        return;
      }

      this.submissionForm.reset();
      this.selectedFiles = null;
      this.router.navigate(['/']);
    }
  }

  private getFileType(filename: string): string {
    const extension = filename.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') return 'Financial'; // Mock logic based on original mock data types
    if (extension === 'docx' || extension === 'doc') return 'Marketing';
    if (extension === 'xlsx' || extension === 'xls') return 'Sales';
    return 'General';
  }
}
