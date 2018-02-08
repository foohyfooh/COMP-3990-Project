const {DatabaseManager} = require('./DatabaseManager');

class SubMenuManager extends DatabaseManager {

  getItemsFromCategory(categoryId){
    return this._query(`
    SELECT id, name, description, cost
    FROM menu_item
    WHERE category = ${categoryId}
    `);
  }

}

exports.SubMenuManager = SubMenuManager;