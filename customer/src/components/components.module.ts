import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category';
import { MenuItemComponent } from './menu-item/menu-item';
import { OrderItemComponent } from './order-item/order-item';
import { TableEntryComponent } from './table-entry/table-entry';
import { QrScreenComponent } from './qr-screen/qr-screen';
@NgModule({
	declarations: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    TableEntryComponent,
    QrScreenComponent],
	imports: [],
	exports: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    TableEntryComponent,
    QrScreenComponent]
})
export class ComponentsModule {}
