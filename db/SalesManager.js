const {DatabaseManager} = require('./DatabaseManager');

class SalesManager extends DatabaseManager{

  /**
   * Get sales either before the date, after the date, or between the dates based on which are defined
   * @param {Date | string | number} from The start date
   * @param {Date | string | number} to The end date
   */
  getSales(from, to){
    if(from && to) return this.getSalesBetween(from, to);
    if(from) return this.getSalesFrom(from);
    if(to) return this.getSalesTo(to);
    return this.getAllSales();
  }

  /**
   * Get all sales
   */
  getAllSales(){
    return this._query(`
    SELECT \`session\`.id, uuid, \`table\`, last_action_time AS \`date\`, SUM(cost) AS cost
    FROM \`session\`
    JOIN orders ON \`session\`.id = orders.\`session\`
    JOIN order_items ON orders.id = order_items.\`order\`
    JOIN menu_item ON menu_item.id = order_items.menu_item
    WHERE \`session\`.paid = b'1'
    GROUP BY \`session\`.id
    `);
  }

  /**
   * Get sales after the specified date
   * @param {Date | string | number} from The start date
   */
  getSalesFrom(from){
    return this._query(`
    SELECT \`session\`.id, uuid, \`table\`, last_action_time AS \`date\`, SUM(cost) AS cost
    FROM \`session\`
    JOIN orders ON \`session\`.id = orders.\`session\`
    JOIN order_items ON orders.id = order_items.\`order\`
    JOIN menu_item ON menu_item.id = order_items.menu_item
    WHERE \`session\`.paid = b'1' AND last_action_time >= ?
    GROUP BY \`session\`.id
    `, [new Date(from)]);
  }

  /**
   * Get the sales before the specified date
   * @param {Date | string | number} to The end date
   */
  getSalesTo(to){
    return this._query(`
    SELECT \`session\`.id, uuid, \`table\`, last_action_time AS \`date\`, SUM(cost) AS cost
    FROM \`session\`
    JOIN orders ON \`session\`.id = orders.\`session\`
    JOIN order_items ON orders.id = order_items.\`order\`
    JOIN menu_item ON menu_item.id = order_items.menu_item
    WHERE \`session\`.paid = b'1' AND last_action_time <= ?
    GROUP BY \`session\`.id
    `, [new Date(to)]);
  }

  /**
   * Get the sales between the specified dates
   * @param {Date | string | number} from The start date
   * @param {Date | string | number} to The end date
   */
  getSalesBetween(from, to){
    return this._query(`
    SELECT \`session\`.id, uuid, \`table\`, last_action_time AS \`date\`, SUM(cost) AS cost
    FROM \`session\`
    JOIN orders ON \`session\`.id = orders.\`session\`
    JOIN order_items ON orders.id = order_items.\`order\`
    JOIN menu_item ON menu_item.id = order_items.menu_item
    WHERE \`session\`.paid = b'1' 
    AND last_action_time BETWEEN ? AND ?
    GROUP BY \`session\`.id
    `, [new Date(from), new Date(to)]);
  }

}

exports.SalesManager = SalesManager;