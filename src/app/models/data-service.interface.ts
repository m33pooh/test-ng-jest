import { Document } from './document.model';
import { User } from './user.model';

export interface DataServiceInterface {
  getUsers(): User[];
  getDocuments(): Document[];
}
