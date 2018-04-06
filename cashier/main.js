const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + path.sep + 'public'));
module.exports = app;
