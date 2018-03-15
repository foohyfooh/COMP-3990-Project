import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemManagerProvider {

  constructor(public http: HttpClient) {}

  /**
   * Get the information for an item
   * @param itemId The desired item
   */
  getItemDetails(itemId: number){
    return this.http.get<MenuItem>(`http://localhost:8080/menu/item/${itemId}`).toPromise();
  }

  /**
   * Get a list of recommendations based on an item
   * @param itemId The item to base recommendations on
   */
  getItemRecommendations(itemId: number){
    return this.http.get<MenuItem[]>(`http://localhost:8080/menu/item/${itemId}/recommendations`).toPromise();
  }

}
