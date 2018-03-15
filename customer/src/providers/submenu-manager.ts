import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SubMenuManagerProvider {

  constructor(private http: HttpClient) {}

  /**
   * Get the menu items that belong to a category
   * @param categoryId The desired category
   */
  getSubMenuItems(categoryId: number){
    return this.http.get<MenuItem[]>(`http://localhost:8080/menu/${categoryId}`).toPromise();
  }

}
