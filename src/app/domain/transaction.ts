import { Account } from './account';

export class Transaction {
    id: number;
    date: String;
    amount: number;
    text: String;
    account: Account;
    participatingAccount: Account;
  }