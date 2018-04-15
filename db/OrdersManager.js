const {DatabaseManager} = require('./DatabaseManager');
const {STATUS_ORDERING, STATUS_CANCELLED} = require('./StatusConstants');

class OrdersManager extends DatabaseManager {

  /**
   * Create an order associagted wit the session
   * @param {number} sessionId The session to which this order is associated with
   */
  async startOrder(sessionId){
    let insertResult = await this._query(`
    INSERT INTO orders (\`session\`)
    VALUES (?)
    `, [sessionId]);
    return insertResult.insertId;
  }

  /**
   * Get all the order ids associated with a session
   * @param {number} sessionId 
   */
  async getOrdersForSession(sessionId){
    let orderRows = await this._query(`
    SELECT id
    FROM orders
    WHERE \`session\` = ?
    `, [sessionId]);
    return orderRows.map(row => row.id);
  }

  /**
   * Return all the menu items that were ordered
   * @param {number} orderId The order whose items to get
   */
  getOrderItems(orderId){
    return this._query(`
    SELECT menu_item.id, menu_item.name AS name, menu_item.cost AS cost, order_items.status AS status
    FROM order_items
    JOIN menu_item ON menu_item.id = order_items.menu_item
    WHERE order_items.order = ? AND order_items.status != ${STATUS_CANCELLED}
    `, [orderId]);
  }

  /**
   * Add an item to the order
   * @param {number} orderId The order to add the menu item
   * @param {number} menuItemId The menu item to add the the order
   */
  async addItemToOrder(orderId, menuItemId){
    let insertResult = await this._query(`
    INSERT INTO order_items (\`order\`, menu_item, status)
    VALUES(?, ?, ${STATUS_ORDERING})
    `, [orderId, menuItemId]);
    return insertResult.insertId;
  }

  /**
   * Get the cost for all the menu items ordered
   * @param {number} orderId 
   */
  getOrderTotal(orderId){
    return this._query(`
    SELECT SUM(menu_item.cost) AS cost
    FROM order_items
    JOIN menu_item ON order_items.menu_item = menu_item.id
    WHERE \`order\` = ? AND order_items.status != ${STATUS_CANCELLED}
    GROUP BY \`order\`
    `, [orderId]);
  }

  /**
   * Get the order items that are not ready
   */
  getPendingOrders(){
    return this._query(`
    SELECT order_items.id AS id, orders.session AS sessionId, menu_item.name AS name, \`table\`, status
    FROM order_items
    JOIN menu_item ON order_items.menu_item = menu_item.id
    JOIN orders ON order_items.order = orders.id
    JOIN session ON orders.session = session.id
    WHERE status IN (1, 2)
    ORDER BY sessionId
    `);
  }

  /**
   * Update the status of a menu item
   * @param {number} menuItemId The menu item whose status to update
   * @param {number} status The status to set
   */
  updateOrderStatus(menuItemId, status){
    return this._query(`
    UPDATE order_items
    SET status = ?
    WHERE id = ?
    `, [status, menuItemId]);
  }

}

exports.OrdersManager = OrdersManager;
