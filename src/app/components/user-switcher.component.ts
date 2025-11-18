import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-user-switcher',
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

}
