import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { MenuPage } from '../menu/menu';
import { QrScreenComponent } from '../../components/qr-screen/qr-screen';
import { StateProvider } from '../../providers/state';
declare const QRCode;

@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  orderItems: OrderItem[];

  constructor(private navCtrl: NavController,  private modalCtrl: ModalController, 
    private state: StateProvider, private sessionManager: SessionManagerProvider,) {
  }

  async ionViewDidLoad() {
    this.orderItems = await this.sessionManager.getOrderItems();
  }

  gotoMenu(){
    this.navCtrl.push(MenuPage);
  }

  async generateQRCode(){
    try{
      let code = QRCode.toDataURL(this.state.getSessionInfo().uuid);
      console.log(code);
      return code;
    }catch(e){
      console.log(e);
    }
  }

  async displayCheckoutCode(){
    let code = await this.generateQRCode();
    let modal = this.modalCtrl.create(QrScreenComponent, {code});
    modal.present();
  }

}
