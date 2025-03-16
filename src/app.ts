'use strict';

const express = require('express');
import cors from 'cors';  // Import the CORS module
import { dbStatusMessage } from './repository/db';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(cors({
  origin: ['https://resume-app-client.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Connect to the database
let statusMessage: string = '';
dbStatusMessage().then((value) => {
  statusMessage = value;
  console.log(statusMessage);
});

app.get('/', (req, res) => {
  res.send('Hello World!' + '___' + statusMessage);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
