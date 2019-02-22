import { Account } from './account';
import { TransactionType } from './transaction-type';

export class Transaction {
    id: number;
    date: Date;
    amount: number;
    text: String;
    account: Account;
    participatingAccount: Account;
    transactionType: TransactionType;
    markedForDelete: boolean;
  }