import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserSwitcherComponent } from './components/user-switcher.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UserSwitcherComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('Myapp');
}
