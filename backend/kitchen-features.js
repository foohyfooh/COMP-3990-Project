const {OrdersManager} = require('../db');

function k(app, io, clientConnections){
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
}

module.exports = k;
