import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { SubMenuManagerProvider } from '../../providers/submenu-manager';

@IonicPage()
@Component({
  selector: 'page-submenu',
  templateUrl: 'submenu.html',
})
export class SubMenuPage {

  private categoryId: number;
  private categoryName: string;
  private menuItems: MenuItem[];

  constructor(private navParams: NavParams, private subMenuManager: SubMenuManagerProvider) {
    this.categoryId = this.navParams.get('id');
    this.categoryName = this.navParams.get('name');
  }

  async ionViewDidLoad() {
    this.menuItems = await this.subMenuManager.getSubMenuItems(this.categoryId);
  }

}
