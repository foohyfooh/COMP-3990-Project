const express = require('express');
const app = express();
app.use('/static', express.static('./static'));
app.use('/cashier', express.static('./cashier'));
app.use('/kitchen', express.static('./kitchen'));
app.use('/business', express.static('./business'));
app.use('/menu', express.static('./menu'));
app.listen(8200, () => console.log('Listening on port 8200'));
