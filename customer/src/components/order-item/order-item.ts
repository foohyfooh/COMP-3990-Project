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

  constructor() {}

  getStatusText(){
    switch(this.status){
      case 1: return 'Ordering';
      case 2: return 'Preparing';
      case 3: return 'Ready';
      case 4: return 'Cancelled';
      case 5: return 'At Table';
      case 6: return 'Picked Up';
      case 7: return 'Unpaid';
      case 8: return 'Paid';
      default: return 'Unknown';
    }
  }

}
