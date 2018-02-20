import { Injectable } from '@angular/core';

@Injectable()
export class StateProvider {

  constructor() {
    
  }

  seTable(table: number = 0){
    localStorage.setItem('table', JSON.stringify(table));
  }

  setTableAsTakeout(){
    this.seTable(0);
  }

  getTable() : number{
    return Number.parseInt(localStorage.getItem('table'));
  }

  isDineIn(){
    return localStorage.getItem('table') !== '0'
  }

  isTakeout(){
    return localStorage.getItem('table') === '0'
  }

  setSessionInfo(session: Session){
    localStorage.setItem('session', JSON.stringify(session));
  }

  getSessionInfo() : Session {
    return JSON.parse(localStorage.getItem('session'));
  }

  setOder(order: Order){
    localStorage.setItem('order', JSON.stringify(order));
  }

  getOrder(): Order {
    return JSON.parse(localStorage.getItem('order'));
  }

}
