import { Component } from '@angular/core';

@Component({
  selector: 'order-item',
  templateUrl: 'order-item.html'
})
export class OrderItemComponent {

  text: string;

  constructor() {
    console.log('Hello OrderItemComponent Component');
    this.text = 'Hello World';
  }

}
