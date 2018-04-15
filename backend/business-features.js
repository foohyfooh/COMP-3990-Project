const {SalesManager} = require('../db');

function b(app){
  //Get a list of sales
  app.post('/sales', async (req, res) => {
    let from = req.body.from, to = req.body.to;
    try{
      let salesManager = new SalesManager();
      await salesManager.connect();
      let sales = await salesManager.getSales(from, to);
      res.json(sales);
    }catch(e){
      console.log(e);
      res.status(500).json({error: e.toString()});
    }
  });
}

module.exports = b;
