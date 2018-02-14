const {DatabaseManager} = require('./DatabaseManager');
const {STATUS_ORDERING} = require('./StatusConstants');

class OrdersManager extends DatabaseManager {

  /**
   * Create an order associagted wit the session
   * @param {number} sessionId The session to which this order is associated with
   */
  async startOrder(sessionId){
    let insertResult = await this._query(`
    INSERT INTO orders (\`session\`)
    VALUES (${sessionId})
    `);
    return insertResult.insertId;
  }

  /**
   * Return all the menu items that were ordered
   * @param {number} orderId The order whose items to get
   */
  getOrderItems(orderId){
    return this._query(`
    SELECT menu_item.name AS name, menu_item.cost AS cost, order_item.status AS status
    FROM order_item
    JOIN menu_item ON menu_item.id = order_item.menu_item
    WHERE order_items.order = ${orderId}
    `);
  }

  /**
   * Add an item to the order
   * @param {number} orderId The order to add the menu item
   * @param {number} menuItemId The menu item to add the the order
   */
  addItemToOrders(orderId, menuItemId){
    return this._query(`
    INSERT INTO order_item (order, menu_item, status)
    VALUES(${orderId}, ${menuItemId}, ${STATUS_ORDERING})
    `);
  }

  /**
   * Get the cost for all the menu items ordered
   * @param {number} orderId 
   */
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
