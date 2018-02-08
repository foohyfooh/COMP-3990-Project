import { NgModule } from '@angular/core';
import { MenuCategoryComponent } from './menu-category/menu-category';
import { MenuItemComponent } from './menu-item/menu-item';
import { OrderItemComponent } from './order-item/order-item';
@NgModule({
	declarations: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent],
	imports: [],
	exports: [MenuCategoryComponent,
    MenuItemComponent,
    OrderItemComponent]
})
export class ComponentsModule {}
