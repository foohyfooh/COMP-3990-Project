import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ItemPage } from '../../pages/item/item';

@Component({
  selector: 'menu-item',
  templateUrl: 'menu-item.html'
})
export class MenuItemComponent {

  @Input() private id: number;
  @Input() private name: string;
  @Input() private description: string;
  @Input() private cost: number;
  @Input() private image: string;

  constructor(private navCtrl: NavController) {}

  gotoItemPage(){
    this.navCtrl.push(ItemPage, {
      id: this.id,
      name: this.name,
      description: this.description,
      cost: this.cost,
      image: this.image
    });
  }

}
