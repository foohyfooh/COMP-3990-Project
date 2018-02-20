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
   * 
   * @param sessionId 
   */
  public async createOrder(sessionId: number){
    let order = await this.http.post<Order>('http://localhost:8080/order', {sessionId}).toPromise();
    this.state.setOder(order);
    return order;
  }

  public async addItemToOrder(itemId: number){
    let orderId = this.state.getOrder().order;
    return this.http.post(`http://localhost:8080/order/${orderId}/add_item/`, {
      menuItemId: itemId
    }).toPromise();
  }

  public async getOrderItems(){
    let orderId = this.state.getOrder().order;
    return this.http.get<OrderItem[]>(`http://localhost:8080/order/${orderId}`).toPromise();
  }

  public async checkoutSession(){
    let sessionId = this.state.getSessionInfo().id;
    return this.http.post(`http://localhost:8080/session/checkout`, {
      sessionId: sessionId
    }).toPromise();
  }

}

