import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  messages: String[] = [];

  constructor() { }

  add(message: String)  {

    this.messages.push(message);
  }

  clear() {

    this.messages = [];
  }
}
