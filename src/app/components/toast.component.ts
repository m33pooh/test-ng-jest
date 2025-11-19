import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="toastService.message()" class="fixed bottom-4 right-4 bg-neutral-900 text-white px-6 py-3 rounded-lg shadow-lg">
      {{ toastService.message() }}
    </div>
  `
})
export class ToastComponent {
  constructor(public toastService: ToastService) { }
}
