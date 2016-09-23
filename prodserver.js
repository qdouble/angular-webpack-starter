const compression = require('compression')
const express = require('express'),
path = require('path');

const PROD_PORT = require('./constants').PROD_PORT;

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.use(compression());
app.use(express.static('dist/client'));

const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/client/index.html'));
}

app.get('/*', renderIndex);

var PORT = process.env.PORT || PROD_PORT;

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});