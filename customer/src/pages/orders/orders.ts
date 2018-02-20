import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { MenuPage } from '../menu/menu';
import { CheckoutPage } from '../checkout/checkout';

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orderItems: OrderItem[];

  constructor(private navCtrl: NavController, private sessionManager: SessionManagerProvider) {
  }

  async ionViewDidLoad() {
    this.orderItems = await this.sessionManager.getOrderItems();
  }

  gotoMenu(){
    this.navCtrl.push(MenuPage);
  }
  
  gotoCheckout(){
    this.navCtrl.push(CheckoutPage);
  }

}
