import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AppComponent } from './app.component';
import { HomePage } from '../pages/home/home';
import { StartPage } from '../pages/start/start';
import { MenuPage } from '../pages/menu/menu';
import { SubMenuPage } from '../pages/submenu/submenu';
import { ItemPage } from '../pages/item/item';
import { OrdersPage } from '../pages/orders/orders';
import { StateProvider } from '../providers/state';
import { TableEntryComponent } from '../components/table-entry/table-entry';
import { SessionManagerProvider } from '../providers/session-manager';
import { MenuManagerProvider } from '../providers/menu-manager';
import { MenuCategoryComponent } from '../components/menu-category/menu-category';
import { SubMenuManagerProvider } from '../providers/submenu-manager';
import { MenuItemComponent } from '../components/menu-item/menu-item';
import { OrderItemComponent } from '../components/order-item/order-item';
import { QrScreenComponent } from '../components/qr-screen/qr-screen';
import { ItemManagerProvider } from '../providers/item-manager';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    StartPage,
    MenuPage,
    SubMenuPage,
    ItemPage,
    OrdersPage,
    TableEntryComponent,
    MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    QrScreenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    StartPage,
    MenuPage,
    TableEntryComponent,
    SubMenuPage,
    ItemPage,
    OrdersPage,
    QrScreenComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StateProvider,
    SessionManagerProvider,
    MenuManagerProvider,
    SubMenuManagerProvider,
    ItemManagerProvider
  ]
})
export class AppModule {}
