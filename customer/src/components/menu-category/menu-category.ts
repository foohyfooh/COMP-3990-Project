import { Component } from '@angular/core';

@Component({
  selector: 'menu-category',
  templateUrl: 'menu-category.html'
})
export class MenuCategoryComponent {

  text: string;

  constructor() {
    console.log('Hello MenuCategoryComponent Component');
    this.text = 'Hello World';
  }

}
