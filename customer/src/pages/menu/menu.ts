import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SubMenuPage } from '../submenu/submenu';
import { MenuManagerProvider } from '../../providers/menu-manager';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  categories: MenuCategory[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuManager: MenuManagerProvider) {
  }

  async ionViewDidLoad() {
    this.categories = await this.menuManager.getMenuCategories();
  }

  gotoSubMenuForCategory(category){
    this.navCtrl.push(SubMenuPage, category);
  }

}
