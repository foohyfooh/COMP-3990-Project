const express = require('express');
const path = require('path');
module.exports = express.static(__dirname + path.sep + 'public');
