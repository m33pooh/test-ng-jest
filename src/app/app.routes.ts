import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: 'submit',
    loadComponent: () => import('./components/document-submission.component').then(m => m.DocumentSubmissionComponent)
  }
];
