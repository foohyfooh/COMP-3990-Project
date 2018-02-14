const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {SessionManager, OrdersManager, MenuManager, SubMenuManager, ItemManager, CheckoutManager} = require('./db');

//Start a session
app.post('/session/', async (req, res) => {
  let table = req.body.table;
  try{
    let sessionManager = new SessionManager();
    await sessionManager.connect();
    let session = await sessionManager.createSession(table);
    sessionManager.disconnect();
    res.json(session);
  }catch(e){
    res.status(500).json(e);
  }
});

//Start an order
app.post('/order/', async (req, res) => {
  let sessionId = req.body.sessionId;
  try{
    let ordersManager = new OrdersManager();
    await ordersManager.connect();
    let order = await ordersManager.startOrder(sessionId);
    ordersManager.disconnect();
    res.json({order});
  }catch(e){
    res.status(500).json(e);
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
    res.status(500).json(e);
  }
});

//Add Item to Order
app.post('/order/:orderId/add_item/', async (req, res) => {
  let orderId = req.body.orderId;
  let menuItemId = req.body.menuItemId;
  try{
    let ordersManager = new OrdersManager();
    await ordersManager.connect();
    await ordersManager.addItemToOrders(orderId, menuItemId);
    menuManager.disconnect();
    res.send('Item Added');
  }catch(e){
    res.status(500).json(e);
  }
});

//Display all menu categories
app.get('/menu', async (res, req) => {
  try{
    let menuManager = new MenuManager();
    await menuManager.connect();
    let categories = await menuManager.getCategories();
    menuManager.disconnect()
    res.json(categories);
  }catch(e){
    res.status(500).json(e);
  }
});

//Display the menu items for a category
app.get('/menu/:category', async (req, res) => {
  let category = req.params.category;
  try{
    let subMenuManager = new SubMenuManager();
    await subMenuManager.connect();
    let menuItems = await subMenuManager.getItemsFromCategory(category);
    subMenuManager.disconnect();
    res.json(menuItems);
  }catch(e){
    res.status(500).json(e);
  }
});

//Get the information for a specific menu item
app.get('/menu/item/:itemId', async (req, res) => {
  let itemId = req.params.itemId;
  try{
    let itemManager = new ItemManager();
    await itemManager.connect();
    let item = await itemManager.getItem(itemId);
    itemManager.disconnect();
    res.json(item);
  }catch(e){
    res.status(500).json(e);
  }
});

//Do the checkout for the orders of a session
app.post('/session/checkout/:sessionId', async (req, res) => {
  let sessionId = req.params.sessionId;
  try{
    let checkoutManager = new CheckoutManager();
    await checkoutManager.connect();
    checkoutManager.checkoutSession(sessionId);
    checkoutManager.disconnect();
    res.send('Checkout Complete');
  }catch(e){
    res.status(500).json(e);
  }
});

app.post('/session/takeout_checkout/:sessionUUID', async (req, res) => {
  let sessionUUID = req.params.sessionUUID;
  try{
    let checkoutManager = new CheckoutManager();
    await checkoutManager.connect();
    checkoutManager.checkoutTakeoutSession(sessionUUID);
    checkoutManager.disconnect();
    res.send('Checkout Complete');
  }catch(e){
    res.status(500).json(e);
  }
});

//Start the server
app.listen(8080, async () => {
  console.log('Listening on port 8080');
});
