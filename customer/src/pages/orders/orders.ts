import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { MenuPage } from '../menu/menu';
import { QrScreenComponent } from '../../components/qr-screen/qr-screen';
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

  constructor(private navCtrl: NavController,  private modalCtrl: ModalController, 
    private state: StateProvider, private sessionManager: SessionManagerProvider,) {
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

  async displayCheckoutCode(){
    let code = await this.generateQRCode();
    let modal = this.modalCtrl.create(QrScreenComponent, {code});
    modal.present();
  }
  
  registerSocket(){
    this.socket = io.connect('http://localhost:8080');
    this.socket.on('customer-update', data => {
      //TODO: Get the correct order item and update its status
      console.log(data);
    });
    this.socket.emit('customer-register', {'id': this.state.getSessionInfo().id});
  }

}
