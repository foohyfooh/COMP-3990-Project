const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

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

require('./customer-features')(app, io, kitchenConnections);
require('./cashier-features')(app);
require('./kitchen-features')(app, io, clientConnections);
require('./business-features')(app);

//Start the server
server.listen(8080, () => console.log('Listening on port 8080'));
