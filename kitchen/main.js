const express = require('express');
const app = express();
app.use(express.static('public'));
app.listen(8082, () => {
  console.log('Listening on port 8082');
});