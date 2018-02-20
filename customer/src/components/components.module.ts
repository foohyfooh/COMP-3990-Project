import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category';
import { MenuItemComponent } from './menu-item/menu-item';
import { OrderItemComponent } from './order-item/order-item';
import { TableEntryComponent } from './table-entry/table-entry';
@NgModule({
	declarations: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    TableEntryComponent],
	imports: [],
	exports: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent,
    TableEntryComponent]
})
export class ComponentsModule {}
