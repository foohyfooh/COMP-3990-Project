const express = require('express');
const app = express();
app.use('/cashier', express.static('../cashier'));
app.use('/kitchen', express.static('../kitchen'));
app.use('/business', express.static('../business'));
app.listen(8200, () => console.log('Listening on port 8200'));