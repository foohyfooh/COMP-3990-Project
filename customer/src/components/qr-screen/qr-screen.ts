import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ReviewPage } from '../../pages/review/review';
import { HomePage } from '../../pages/home/home';

@Component({
  selector: 'qr-screen',
  templateUrl: 'qr-screen.html'
})
export class QrScreenComponent {

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
