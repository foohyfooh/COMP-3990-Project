import { Component, Input } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SubMenuPage } from '../../pages/submenu/submenu';

@Component({
  selector: 'menu-category',
  templateUrl: 'menu-category.html'
})
export class MenuCategoryComponent {

  @Input() id: number;
  @Input() name: string;
  @Input() count: number;

  constructor(private navCtrl: NavController) {}

  gotoCategory(){
    this.navCtrl.push(SubMenuPage, {
      id: this.id,
      name: this.name,
      count: this.count
    });
  }

}
