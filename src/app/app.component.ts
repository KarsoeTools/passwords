import { Component } from '@angular/core';
import { Guid } from "guid-typescript";
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  constructor(private clipboard: Clipboard) {}
  title = 'guids';
  password : string  = '';

  numbers : string = '0123456789';
  constants : string = 'bcdfghjklmnopqrstvwxz';
  vovels : string = 'aeiouy';


  generatePassword(length : string) {
    this.createPassword(+length).then( o => this.password=o);
  }

   createPassword = async (length: number): Promise<string> => {

    const characters = this.numbers+this.constants+this.vovels+this.constants.toLocaleUpperCase()+this.vovels.toLocaleUpperCase();
    const crypto = window.crypto || (window as any).msCrypto; // For compatibility with IE11.
    const buffer = new Uint8Array(length);
    // Generate random values and store them in the buffer.
    const array = await crypto.getRandomValues(buffer);
    let password = '';
    for (let i = 0; i < length; i++) {
      // Use the modulus operator to get a random index in the characters string
      // and add the corresponding character to the password.
      password += characters.charAt(array[i] % characters.length);
    }
    //this.clipboard.copy(this.guids)
    return password;
  }

  copyClipboard() {
    this.clipboard.copy(this.password);
  }
}
