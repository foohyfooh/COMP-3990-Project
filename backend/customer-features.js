const {SessionManager, OrdersManager, MenuManager, StatusConstants, ReviewManager} = require('../db');

function c(app, io, kitchenConnections){
  //Start a session
  app.post('/session', async (req, res) => {
    let table = req.body.table;
    try{
      let sessionManager = new SessionManager();
      await sessionManager.connect();
      let session = await sessionManager.createSession(table);
      sessionManager.disconnect();
      res.json(session);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Start an order
  app.post('/order', async (req, res) => {
    let sessionId = req.body.sessionId;
    try{
      let ordersManager = new OrdersManager();
      await ordersManager.connect();
      let order = await ordersManager.startOrder(sessionId);
      ordersManager.disconnect();
      res.json({order});
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Display all the items of an order
  app.get('/order/:orderId', async (req, res) => {
    let orderId = req.params.orderId;
    try{
      let ordersManager = new OrdersManager();
      await ordersManager.connect();
      let orders = await ordersManager.getOrderItems(orderId);
      ordersManager.disconnect();
      res.json(orders);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Add Item to Order
  app.post('/order/:orderId/add_item', async (req, res) => {
    let orderId = req.params.orderId;
    let sessionId = req.body.sessionId;
    let menuItemId = req.body.menuItemId;
    let name = req.body.name;
    let table = req.body.table;
    try{
      let ordersManager = new OrdersManager();
      await ordersManager.connect();
      let orderItemId = await ordersManager.addItemToOrder(orderId, menuItemId);
      ordersManager.disconnect();
      for(let kitchenId in kitchenConnections){
        io.to(kitchenConnections[kitchenId]).emit('kitchen-add-item', {
          sessionId: sessionId,
          id: orderItemId,
          name: name,
          table: table,
          status: StatusConstants.STATUS_ORDERING
        });
      }
      res.json({
        'message': 'Item Added'
      });
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Display all menu categories
  app.get('/menu', async (req, res) => {
    try{
      let menuManager = new MenuManager();
      await menuManager.connect();
      let categories = await menuManager.getCategories();
      menuManager.disconnect()
      res.json(categories);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Display the menu items for a category
  app.get('/menu/:category', async (req, res) => {
    let category = req.params.category;
    try{
      let menuManager = new MenuManager();
      await menuManager.connect();
      let menuItems = await menuManager.getItemsFromCategory(category);
      menuManager.disconnect();
      res.json(menuItems);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Get the information for a specific menu item
  app.get('/menu/item/:itemId', async (req, res) => {
    let itemId = req.params.itemId;
    try{
      let menuManager = new MenuManager();
      await menuManager.connect();
      let item = await menuManager.getItem(itemId);
      menuManager.disconnect();
      res.json(item);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Get recommendations based on a specified menu item
  app.get('/menu/item/:itemId/recommendations', async (req, res) => {
    let itemId = req.params.itemId;
    try{
      let menuManager = new MenuManager();
      await menuManager.connect();
      let recommendations = await menuManager.getRecommendations(itemId);
      menuManager.disconnect();
      res.json(recommendations);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  //Display all orders that show be in the kitchen
  app.get('/orders', async (req, res) => {
    try{
      let ordersManager = new OrdersManager();
      await ordersManager.connect();
      let orders = await ordersManager.getPendingOrders();
      ordersManager.disconnect();
      res.json(orders);
    }catch(e){
      res.status(500).json({error: e});
    }
  });

  app.post('/review', async (req, res) => {
    let sessionId = req.body.sessionId;
    let rating = req.body.rating;
    let comment = req.body.comment;
    try{
      let reviewManager = new ReviewManager();
      await reviewManager.connect();
      await reviewManager.postReview(sessionId, rating, comment);
      reviewManager.disconnect();
      res.json({
        'message': 'Review Added'
      });
    }catch(e){
      res.status(500).json({error: e});
    }
  });
}

module.exports = c;
