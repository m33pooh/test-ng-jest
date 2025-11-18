import { User } from './user.model';
import { DocumentStatus } from './document-status.enum';

export interface Document {
  name: string;
  size: string;
  type: string;
  submittedBy: User;
  submittedDate: string;
  status: DocumentStatus;
}
