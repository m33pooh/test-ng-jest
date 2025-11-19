import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  message = signal<string | null>(null);

  show(message: string) {
    this.message.set(message);
    setTimeout(() => this.message.set(null), 3000);
  }
}
