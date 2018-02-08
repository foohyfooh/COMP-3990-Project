const {DatabaseManager} = require('./DatabaseManager');

class MenuManager extends DatabaseManager {

  getCategories(){
    return this._query(`
    SELECT category.name, COUNT(menu_item.category) 
    FROM category 
    JOIN menu_item ON category.id = menu_item.category
    GROUP BY category.name
    `);
  }

}

exports.MenuManager = MenuManager;