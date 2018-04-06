const {CheckoutManager} = require('../db');

function c(app){
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
}

module.exports = c;
