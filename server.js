const express = require('express');
const path = require('path');

let app = express();
app.use(express.static(__dirname + '/dist'));

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Listening on port ' + port);
});
