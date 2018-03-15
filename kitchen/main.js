const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname + path.sep + 'public'));
app.listen(8082, () => {
  console.log('Listening on port 8082');
});
