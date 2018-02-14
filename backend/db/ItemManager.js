const {DatabaseManager} = require('./DatabaseManager');

class ItemManager extends DatabaseManager {

  /**
   * Get the details for a desired menu item
   * @param {number} itemId The desired menu item`
   */
  getItem(itemId){
    return this._query(`
    SELECT name, category, description, cost
    FROM menu_item
    WHERE id = ${itemId}
    `);
  }

}

exports.ItemManager = ItemManager;
