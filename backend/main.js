const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const {SessionManager, OrdersManager, MenuManager, SubMenuManager, ItemManager, CheckoutManager, StatusConstants} = require('../db');

//Handle CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//Get body as JSON
app.use(bodyParser.json());

//Socket connections for clients and kitchen
let clientConnections = {};
let kitchenConnections = {};

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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
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
    res.status(500).json({error: e});;
  }
});

//Get recommendations based on a specified menu item
app.get('/menu/item/:itemId/recommendations', async (req, res) => {
  let itemId = req.params.itemId;
  try{
    let itemManager = new ItemManager();
    await itemManager.connect();
    let recommendations = await itemManager.getRecommendations(itemId);
    itemManager.disconnect();
    res.json(recommendations);
  }catch(e){
    res.status(500).json({error: e});;
  }
});

//Do the checkout for the orders of a session
app.post('/session/checkout', async (req, res) => {
  let session = req.body.session;
  try{
    let checkoutManager = new CheckoutManager();
    await checkoutManager.connect();
    checkoutManager.checkoutSession(session);
    checkoutManager.disconnect();
    res.json({
      'message': 'Checkout Complete'
    });
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

//Update the status of an order item
app.post('/order/:orderItemId/status', async (req, res) => {
  let orderItemId = req.params.orderItemId;
  let sessionId = req.body.sessionId;
  let status = req.body.status;
  try{
    let ordersManager = new OrdersManager();
    await ordersManager.connect();
    await ordersManager.updateOrderStatus(orderItemId, status);
    ordersManager.disconnect();
    if(clientConnections[sessionId]){
      io.to(clientConnections[sessionId]).emit('customer-update', {
        orderItemId: Number.parseInt(orderItemId),
        status: Number.parseInt(status)
      });
    }
    res.json({
      'message': 'Status Updated'
    });
  }catch(e){
    res.status(500).json({error: e});
  }
});

//Socket for status updates between the kitchen and the customers
io.on('connection', socket => {
  //Register connections
  socket.on('customer-register', data => {
    let id = data.id;
    clientConnections[id] = socket.id;
  });

  socket.on('kitchen-register', data => {
    let id = data.id;
    kitchenConnections[id] = socket.id;
  });
});


//Start the server
server.listen(8080, () => {
  console.log('Listening on port 8080');
});
