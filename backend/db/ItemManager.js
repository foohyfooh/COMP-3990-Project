const {DatabaseManager} = require('./DatabaseManager');

class ItemManager extends DatabaseManager {

  getItem(itemId){
    return this._query(`
    SELECT name, category, description, cost
    FROM menu_item
    WHERE id = ${itemId}
    `);
  }


}

exports.ItemManager = ItemManager;