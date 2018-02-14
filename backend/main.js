const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const {SessionManager, OrdersManager, MenuManager, SubMenuManager, ItemManager, CheckoutManager} = require('./db');

app.get('/', (req, res) => {
  
});

//Start a session
app.post('/session/:table', async (req, res) => {
  let sessionManager = new SessionManager();
  let table = req.params.table;
  await sessionManager.connect();
  let insert = await sessionManager.createSession(table);
  ordersManager.disconnect();
  res.send(insert);
});

//Start an order
app.post('/order', async (req, res) => {
  let sessionId = req.body.sessionId;
  let ordersManager = new OrdersManager();
  await ordersManager.connect();
  ordersManager.startOrder(sessionId)
  ordersManager.disconnect();
  res.send();
});

//Display all the items of an order
app.get('/order', async (req, res) => {

});

//Add Item to Order
app.post('/order/:orderId/add_item/', async (req, res) => {
  let orderId = req.body.orderId;
  let menuItemId = req.body.menuItemId;
  let ordersManager = new OrdersManager();
  await ordersManager.connect();
  await ordersManager.addItemToOrders(orderId, menuItemId);
  menuManager.disconnect();
  res.send();
});

//Display all menu categories
app.get('/menu', async (res, req) => {
  let menuManager = new MenuManager();
  await menuManager.connect();
  let categories = await menuManager.getCategories();
  menuManager.disconnect()
  res.json(categories);
});

//Display the menu items for a category
app.get('/menu/:category', async (req, res) => {
  let category = req.params.category;
  let subMenuManager = new SubMenuManager();
  await subMenuManager.connect();
  let menuItems = await subMenuManager.getItemsFromCategory(category);
  subMenuManager.disconnect();
  res.json(menuItems);
});

//Get the information for a specific menu item
app.get('/menu/item/:item', async (req, res) => {
  let itemId = req.params.item;
  let itemManager = new ItemManager();
  await itemManager.connect();
  let item = await itemManager.getItem(itemId);
  itemManager.disconnect();
  res.json(item);
});

//Do the checkout for the orders of a session
app.post('/session/checkout/:session', async (req, res) => {
  let sessionId = req.params.session;
  let checkoutManager = new CheckoutManager();
  await checkoutManager.connect();
  
  checkoutManager.disconnect();
  res.send();
});

//Start the server
app.listen(8080, async () => {
  console.log('Listening on port 8080');
});
