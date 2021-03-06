const express = require('express');
const path = require('path');
const app = express();
app.get('/', (req, res) => res.sendFile(__dirname + path.sep + 'index.html'));
app.use('/static', express.static(__dirname + path.sep + 'static'));
app.use('/cashier', express.static(__dirname + path.sep + 'cashier'));
app.use('/kitchen', express.static(__dirname + path.sep + 'kitchen'));
app.use('/business', express.static(__dirname + path.sep + 'business'));
app.use('/menu', express.static(__dirname + path.sep + 'menu'));
app.listen(8200, () => console.log('Listening on port 8200'));
