import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { DocumentListComponent } from './components/document-list.component';
import { DocumentListItemComponent } from './components/document-list-item.component';
import { UserSwitcherComponent } from './components/user-switcher.component';
import { DocumentSubmissionComponent } from './components/document-submission.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DashboardComponent, DocumentListComponent, DocumentListItemComponent, UserSwitcherComponent, DocumentSubmissionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Myapp');
}
