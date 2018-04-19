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
import { SessionManagerProvider } from '../providers/session-manager';
import { MenuManagerProvider } from '../providers/menu-manager';
import { MenuCategoryComponent } from '../components/menu-category/menu-category';
import { SubMenuManagerProvider } from '../providers/submenu-manager';
import { MenuItemComponent } from '../components/menu-item/menu-item';
import { OrderItemComponent } from '../components/order-item/order-item';
import { CheckoutPage } from '../pages/checkout/checkout';
import { ItemManagerProvider } from '../providers/item-manager';
import { ReviewPage } from '../pages/review/review';

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    StartPage,
    MenuPage,
    SubMenuPage,
    ItemPage,
    OrdersPage,
    MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    CheckoutPage,
    ReviewPage
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
    SubMenuPage,
    ItemPage,
    OrdersPage,
    CheckoutPage,
    ReviewPage
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
