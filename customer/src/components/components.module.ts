import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category';
import { MenuItemComponent } from './menu-item/menu-item';
import { OrderItemComponent } from './order-item/order-item';
import { QrScreenComponent } from './qr-screen/qr-screen';
@NgModule({
	declarations: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    QrScreenComponent],
	imports: [],
	exports: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    QrScreenComponent]
})
export class ComponentsModule {}
