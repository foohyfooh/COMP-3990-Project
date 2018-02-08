const {DatabaseManager} = require('./DatabaseManager');
const {STATUS_ORDERING} = require('./StatusConstants');

class OrdersManager extends DatabaseManager {

  getCustomerOrders(){
    return Promise.resolve(null);
  }

  startOrder(sessionId){
    return this._query(`
    INSERT INTO orders (session)
    VALUES ('${sessionId}');
    `);
  }

  getOrderItems(orderId){
    return this._query(`
    SELECT menu_item.name, menu_item.cost, order_item.status
    FROM order_item
    JOIN menu_item ON menu_item.id = order_item.menu_item
    WHERE order_items.order = ${orderId}
    `);
  }

  addItemToOrders(orderId, menuItemId){
    return this._query(`
    INSERT INTO order_item (order, menu_item, status)
    VALUES(${orderId}, ${menuItemId}, ${STATUS_ORDERING})
    `);
  }

  getOrderTotal(orderId){
    return this._query(`
    SELECT SUM(menu_item.cost)
    FROM order_items
    JOIN menu_item ON order_items.menu_item = menu_item.id
    WHERE \`order\` = ${orderId}
    GROUP BY \`order\`
    `);
  }

}

exports.OrdersManager = OrdersManager;