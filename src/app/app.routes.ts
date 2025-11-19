import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { DocumentSubmissionComponent } from './components/document-submission.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'submit', component: DocumentSubmissionComponent }
];
