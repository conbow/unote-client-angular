import { Account } from './account.model';

export class Note {
  id = '';
  title = '';
  body = '';
  createdAt: string;
  updatedAt: string;
  creator: Account;
}
