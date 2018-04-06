const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const {SalesManager} = require('../db');

app.use(bodyParser.json());
app.use(express.static(__dirname + path.sep + 'public'));

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
    res.status(500).json({error: e});
  }
});

module.exports  = app;
