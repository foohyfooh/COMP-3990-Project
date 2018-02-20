import { Component, ViewChild, ElementRef } from '@angular/core';
import { ViewController, NavController } from 'ionic-angular';
import { StateProvider } from '../../providers/state';
import { MenuPage } from '../../pages/menu/menu';
import { SessionManagerProvider } from '../../providers/session-manager';

@Component({
  selector: 'table-entry',
  templateUrl: 'table-entry.html'
})
export class TableEntryComponent {

  @ViewChild('table') private tableInput: ElementRef;

  constructor(private viewCtrl: ViewController, private navCtrl: NavController, 
    private state: StateProvider, private sessionManager: SessionManagerProvider) {

  }

  submit(){
    let tableValue = this.tableInput.nativeElement.value;
    if(tableValue === '') return;
    let table = Number.parseInt(tableValue);
    this.state.seTable(table);
    this.sessionManager.createSession(table);
    this.navCtrl.push(MenuPage);
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
