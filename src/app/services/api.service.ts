import { Injectable } from '@angular/core';
import { DataServiceInterface } from '../models/data-service.interface';
import { Document } from '../models/document.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements DataServiceInterface {

  constructor() { }

  getUsers(): User[] {
    console.warn('ApiService: Real API not implemented. returning empty list.');
    return [];
  }

  getDocuments(): Document[] {
    console.warn('ApiService: Real API not implemented. returning empty list.');
    return [];
  }
}
