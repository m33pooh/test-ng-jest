import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button (click)="themeService.toggleTheme()" class="w-full flex items-center justify-center h-12">
      <span *ngIf="themeService.isDarkMode()">Light Mode</span>
      <span *ngIf="!themeService.isDarkMode()">Dark Mode</span>
    </button>
  `
})
export class ThemeToggleComponent {
  constructor(public themeService: ThemeService) { }
}
