import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { TableEntryComponent } from '../../components/table-entry/table-entry';

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
  }

  submitTableNumberViaCamera(){
    
  }

  openTableNumberModal(){
    let modal = this.modalCtrl.create(TableEntryComponent);
    modal.present();
  }

  submitTableNumberVaiModal(){

  }

  
}
