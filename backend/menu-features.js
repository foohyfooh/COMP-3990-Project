const {MenuManager} = require('../db');
const {zip} = require('./utils');

function m(app){
  //Get full menu
  app.get('/full_menu', async (req, res) => {
    try{
      let menuManager = new MenuManager();
      await menuManager.connect()
      let categories = await menuManager.getCategories();
      let menuItems = await Promise.all(categories.map(category => menuManager.getItemsFromCategory(category.id)));
      menuManager.disconnect();
      let fullMenu = zip(categories, menuItems).map(pair => {
        pair[0].items = pair[1];
        return pair[0];
      });
      res.json(fullMenu);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Add menu item
  app.post('/menu/item/add', async (req, res) => {
    let name = req.body.name;
    let cost = req.body.cost;
    let desc = req.body.description;
    let category = req.body.category;
    let image = req.body.image;
    try{
      let menuManager = new MenuManager();
      await menuManager.connect();
      await menuManager.addItemToCategory(category, name, cost, desc, image);
      res.json({'message':'Item Add to Menu'});
    }catch(e){
      res.status(500).json({error: e});
    }
  });
}

module.exports = m;
