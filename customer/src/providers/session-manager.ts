import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateProvider } from './state';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SessionManagerProvider {

  constructor(private http: HttpClient, private state: StateProvider) {}

  /**
   * Create a session for the table
   * @param table The table that the session belongs to
   */
  public async createSession(table: number = 0){
    let session = await this.http.post<Session>('http://localhost:8080/session/', {table}).toPromise();
    this.state.setSessionInfo(session);
    await this.createOrder(session.id);
    return session;
  }

  /**
   * Create an order associated with a session
   * @param sessionId The session for which to create an order
   */
  public async createOrder(sessionId: number){
    let order = await this.http.post<Order>('http://localhost:8080/order', {sessionId}).toPromise();
    this.state.setOder(order);
    return order;
  }

  /**
   * Add an item to the order
   * @param itemId The item to add to your order
   * @param name The name of the item
   */
  public async addItemToOrder(itemId: number, name: string){
    let sessionId = this.state.getSessionInfo().id;
    let orderId = this.state.getOrder().order;
    let table = this.state.getTable();
    return this.http.post(`http://localhost:8080/order/${orderId}/add_item/`, {
      sessionId: sessionId,
      name: name,
      table: table,
      menuItemId: itemId
    }).toPromise();
  }

  /** 
   * Get the items within an order
  */
  public async getOrderItems(){
    let orderId = this.state.getOrder().order;
    return this.http.get<OrderItem[]>(`http://localhost:8080/order/${orderId}`).toPromise();
  }

}

