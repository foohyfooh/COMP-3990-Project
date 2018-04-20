import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-review',
  templateUrl: 'review.html',
})
export class ReviewPage {

  private review;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionManager: SessionManagerProvider) {
    this.review = {
      rating: 0,
      comment: ''
    };
  }

  ionViewDidLoad() {}

  async submitReview(){
    await this.sessionManager.postReview(this.review.rating, this.review.comment);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
