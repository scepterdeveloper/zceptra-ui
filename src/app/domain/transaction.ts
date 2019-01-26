import { Account } from './account';

export class Transaction {
    id: number;
    date: Date;
    amount: number;
    text: String;
    account: Account;
    participatingAccount: Account;
  }