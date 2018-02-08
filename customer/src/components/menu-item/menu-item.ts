import { Component } from '@angular/core';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  text: string;

  constructor() {
    console.log('Hello MenuItemComponent Component');
    this.text = 'Hello World';
  }

}
