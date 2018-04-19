import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { MenuPage } from '../menu/menu';
import { CheckoutPage } from '../checkout/checkout';
import { StateProvider } from '../../providers/state';
declare const QRCodeGenerator;
declare const io;

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orderItems: OrderItem[];
  socket;

  constructor(private navCtrl: NavController, private state: StateProvider, private sessionManager: SessionManagerProvider,) {
  }

  async ionViewDidLoad() {
    this.orderItems = await this.sessionManager.getOrderItems();
    this.registerSocket();
  }

  gotoMenu(){
    this.navCtrl.push(MenuPage);
  }

  async generateQRCode(){
    try{
      let code = QRCodeGenerator.toDataURL(this.state.getSessionInfo().uuid);
      return code;
    }catch(e){
      console.log(e);
    }
  }

  async gotoCheckout(){
    let code = await this.generateQRCode();
    this.navCtrl.push(CheckoutPage, {code})
  }
  
  registerSocket(){
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('customer-update', data => {
      for (let i = 0; i < this.orderItems.length; i++) {
        if(this.orderItems[i].id === data.orderItemId){
          this.orderItems[i].status = data.status;
          break;
        }
      }
    });
    this.socket.emit('customer-register', {'id': this.state.getSessionInfo().id});
  }

}
