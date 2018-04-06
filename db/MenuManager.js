const {DatabaseManager} = require('./DatabaseManager');

class MenuManager extends DatabaseManager {

  /** 
   * Get the menu categories and the numnber of items in each category
  */
  getCategories(){
    return this._query(`
    SELECT category.id, category.name, COUNT(menu_item.category) AS count 
    FROM category 
    LEFT JOIN menu_item ON category.id = menu_item.category
    GROUP BY category.name
    ORDER BY category.id
    `);
  }

  /**
   * Get the menu items from a category
   * @param {number} categoryId The desired menu category
   */
  getItemsFromCategory(categoryId){
    return this._query(`
    SELECT id, name, description, cost, image
    FROM menu_item
    WHERE category = ?
    `, [categoryId]);
  }

  /**
   * Get the details for a desired menu item
   * @param {number} itemId The desired menu item
   */
  getItem(itemId){
    return this._query(`
    SELECT name, category, description, cost, image
    FROM menu_item
    WHERE id = ?
    `, [itemId]);
  }

  /**
   * Get recommendations based on a menu item
   * @param {number} itemId The item to base recommendations on
   */
  async getRecommendations(itemId){
    let item = (await this.getItem(itemId))[0];
    let lowerCostBound = item.cost - 5, upperCostBound = item.cost + 5;
    return this._query(`
    SELECT id, name, description, cost, image
    FROM menu_item
    WHERE id != ? AND category = ?
    AND cost BETWEEN ? AND ?
    `, [itemId, item.category, lowerCostBound, upperCostBound]);
  }

  /**
   * Add an item to a category
   * @param {number} category The category to the menu item to
   * @param {string} name The name of the new menu item
   * @param {number} cost The cost of the new menu item
   * @param {number} desc The description of the new menu item
   * @param {string} image The base64 string for the image
   */
  addItemToCategory(category, name, cost, desc, image){
    return this._query(`
    INSERT INTO menu_item(name, category, cost, description, image)
    VALUES(?, ?, ?, ?, ?)
    `, [name, category, cost, desc, image]);
  }

}

exports.MenuManager = MenuManager;
