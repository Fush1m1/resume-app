'use strict';

const express = require('express');

import { dbStatusMessage } from './repository/db';
// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Connect to the database
var statusMessage: string = '';
dbStatusMessage().then((value) => {
  statusMessage = value;
  console.log(statusMessage);
});

app.get('/', (req, res) => {
  res.send('Hello World!' + '___'+ statusMessage);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
