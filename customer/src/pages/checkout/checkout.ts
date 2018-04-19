import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReviewPage } from '../../pages/review/review';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {

  private code: string;

  constructor(private navCtrl: NavController, private navParams: NavParams) {
    this.code = this.navParams.get('code');
  }

  review(){
    this.navCtrl.push(ReviewPage);
  }

  close(){
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
