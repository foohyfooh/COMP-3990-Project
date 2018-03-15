import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SessionManagerProvider } from '../../providers/session-manager';
import { OrdersPage } from '../orders/orders';
import { ItemManagerProvider } from '../../providers/item-manager';

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  private itemId: number;
  private itemName: string;
  private itemCost: number;
  private itemDescription: string;
  private recommendations: MenuItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private sessionManager: SessionManagerProvider, private itemManager: ItemManagerProvider) {
    this.itemId = this.navParams.get('id');
    this.itemName = this.navParams.get('name');
    this.itemCost = this.navParams.get('cost');
    this.itemDescription = this.navParams.get('description');
    this.recommendations = [];
  }

  ionViewDidLoad() {
    this.getRecommendations();
  }

  async orderItem(){
    await this.sessionManager.addItemToOrder(this.itemId, this.itemName);
    this.navCtrl.push(OrdersPage);
  }

  async getRecommendations(){
    this.recommendations = await this.itemManager.getItemRecommendations(this.itemId);
  }

  gotoRecommendation(recommendation){
    this.navCtrl.push(ItemPage, recommendation);
  }

}
