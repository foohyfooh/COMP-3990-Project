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

  @ViewChild('rating') private ratingInput: ElementRef;
  @ViewChild('comment') private commentInput: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, private sessionManager: SessionManagerProvider) {}

  ionViewDidLoad() {}

  async submitReview(){
    let rating = Number.parseInt(this.ratingInput.nativeElement.value);
    let comment = this.commentInput.nativeElement.value;
    await this.sessionManager.postReview(rating, comment);
    this.navCtrl.setRoot(HomePage);
    this.navCtrl.popToRoot();
  }

}
