import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../models/user.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-user-switcher',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-switcher.component.html'
})
export class UserSwitcherComponent implements OnInit {

  users: User[] = [];
  currentUser: User;

  constructor(private documentService: DocumentService) {
    this.currentUser = this.documentService.getCurrentUser()();
  }

  ngOnInit(): void {
    this.users = this.documentService.getUsers();
  }

  switchUser(user: User) {
    this.documentService.setCurrentUser(user);
    this.currentUser = user;
  }

  onUserChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedUser = this.users[target.selectedIndex];
    this.switchUser(selectedUser);
  }

}
