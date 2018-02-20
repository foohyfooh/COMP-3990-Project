import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { StartPage } from '../start/start';
import { MenuPage } from '../menu/menu';
import { StateProvider } from '../../providers/state';
import { SessionManagerProvider } from '../../providers/session-manager';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private state: StateProvider, private sessionManager: SessionManagerProvider) {
  }

  gotoTableNumberEntry(){
    this.navCtrl.push(StartPage);
  }
  
  gotoMenuAsTakeout(){
    this.state.setTableAsTakeout();
    this.sessionManager.createSession();
    this.navCtrl.push(MenuPage);
  }

}
