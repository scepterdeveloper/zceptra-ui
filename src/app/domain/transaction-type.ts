import {OrganizingEntity} from '../domain/organizing-entity';

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
}
