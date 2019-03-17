import {OrganizingEntity} from '../domain/organizing-entity';
import { Account } from './account';

export class TransactionType {
  id: number;
  name: String;
  description: String;
  dateLabel: String;
  amountLabel: String;
  descriptionLabel: String;
  creditAccountLabel: String;
  debitAccountLabel: String;
  debitAccountOrganizingEntityType: String;
  creditAccountOrganizingEntityType: String;
  debitableEntities: number[];
  creditableEntities: number[];
  debitableAccounts: Account[];
  creditableAccounts: Account[];
  debitAccountFixed: Boolean;
  debitAccountHidden: Boolean;
  creditAccountFixed: Boolean;
  creditAccountHidden: Boolean;  
}
