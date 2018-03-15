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

  async getRecommendations(itemId){
    let item = (await this.getItem(itemId))[0];
    let lowerCostBound = item.cost - 5, upperCostBound = item.cost + 5;
    return this._query(`
    SELECT id, name, description, cost
    FROM menu_item
    WHERE id != ${itemId} AND category = ${item.category}
    AND cost BETWEEN ${lowerCostBound} AND ${upperCostBound}
    `);
  }

}

exports.ItemManager = ItemManager;
