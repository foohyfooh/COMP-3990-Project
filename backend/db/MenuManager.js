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

}

exports.MenuManager = MenuManager;
