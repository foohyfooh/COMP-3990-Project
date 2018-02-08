import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubmenuPage } from './submenu';

@NgModule({
  declarations: [
    SubmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(SubmenuPage),
  ],
})
export class SubmenuPageModule {}
