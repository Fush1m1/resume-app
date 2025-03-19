'use strict';

import express from 'express';  // Import the Express module
import cors from 'cors';  // Import the CORS module
import { dbStatusMessage } from './repository/db';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// read .env file
import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
  origin: process.env.ORIGIN,
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
  res.send('Hello World! from backend. DB status: ' + statusMessage);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
