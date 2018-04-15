const {SessionManager, OrdersManager} = require('../db');
const {flatten} = require('./utils');

function c(app){
  //Get the total for a session
  app.get('/session/:sessionUUID/details', async (req, res) => {
    let sessionUUID = req.params.sessionUUID;
    try{
      let sessionManager = new SessionManager();
      let ordersManager = new OrdersManager();
      await Promise.all([sessionManager.connect(), ordersManager.connect()]);
      let session = await sessionManager.getSessionFromUUID(sessionUUID);
      let orderIds = await ordersManager.getOrdersForSession(session.id);
      let ordersItems = flatten(await Promise.all(orderIds.map(id => ordersManager.getOrderItems(id))));
      let cost = ordersItems.reduce((sum, item) => sum + item.cost, 0);
      sessionManager.disconnect();
      ordersManager.disconnect();
      res.json({items: ordersItems, cost: cost});
    }catch(e){
      console.log(e);
      res.status(500).json({error: e.toString()});
    }
  });

  //Do the checkout for the orders of a session
  app.post('/session/checkout', async (req, res) => {
    let session = req.body.session;
    try{
      let sessionManager = new SessionManager();
      await sessionManager.connect();
      sessionManager.checkoutSession(session);
      sessionManager.disconnect();
      res.json({
        'message': 'Checkout Complete'
      });
    }catch(e){
      console.log(e);
      res.status(500).json({error: e.toString()});
    }
  });
}

module.exports = c;
