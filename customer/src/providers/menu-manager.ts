import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class MenuManagerProvider {

  constructor(private http: HttpClient) {}

  /**
   * Get the menu categories
   */
  public async getMenuCategories(){
    return await this.http.get<MenuCategory[]>('http://localhost:8080/menu').toPromise();
  }

}
