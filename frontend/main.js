const express = require('express');
const app = express();
app.use('/cashier', require('../cashier'));
app.use('/kitchen', require('../kitchen'));
app.use('/business', require('../business'));
app.listen(8200, () => {
  console.log('Listening on port 8200');
});