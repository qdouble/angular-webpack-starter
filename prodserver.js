"use strict";
const compression = require('compression')
const express = require('express'),
path = require('path');

const E2E_PORT = require('./constants').E2E_PORT;
const HOST = require('./constants').HOST;
const PROD_PORT = require('./constants').PROD_PORT;

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));

app.use(compression());
app.use(express.static('dist'));

const renderIndex = (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist/index.html'));
}

app.get('/*', renderIndex);

let e2e;
const ENV = process.env.npm_lifecycle_event;
if (ENV === 'e2e:server') { e2e = E2E_PORT };
const PORT = e2e || PROD_PORT;

app.listen(PORT, () => {
  console.log(`Listening on: http://${HOST}:${PORT}`);
});