import { Component } from '@angular/core';
import { StateProvider } from '../../providers/state';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'qr-screen',
  templateUrl: 'qr-screen.html'
})
export class QrScreenComponent {

  private code: string;

  constructor(private navParams: NavParams, private viewCtrl: ViewController, private state: StateProvider) {
    this.code = this.navParams.get('code');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
