const compression = require('compression')
const express = require('express'),
path = require('path');

const ports = require('./constants')

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.use(compression())
app.use(express.static('dist'));

const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
}

app.get('/*', renderIndex);

var PORT = process.env.PORT || ports.PROD_PORT;

console.log(PORT)

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});