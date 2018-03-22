const {DatabaseManager} = require('./DatabaseManager');

class SubMenuManager extends DatabaseManager {

  /**
   * Get the menu items from a category
   * @param {number} categoryId The desired menu category
   */
  getItemsFromCategory(categoryId){
    return this._query(`
    SELECT id, name, description, cost
    FROM menu_item
    WHERE category = ${categoryId}
    `);
  }

}

exports.SubMenuManager = SubMenuManager;
