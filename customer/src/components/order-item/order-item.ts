import { Component, Input } from '@angular/core';

@Component({
  selector: 'order-item',
  templateUrl: 'order-item.html'
})
export class OrderItemComponent {

  @Input() id: number;
  @Input() name: string;
  @Input() cost: number;
  @Input() status: number;
  private statusText: number;

  constructor() {
  }

}
