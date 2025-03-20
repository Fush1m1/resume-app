'use strict';

import express from 'express';  // Import the Express module
import cors from 'cors';  // Import the CORS module
import { dbStatusMessage, deleteDBContent, getDBContent, updateDBContent } from './repository/db';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// read .env file
import dotenv from 'dotenv';
dotenv.config();

app.use(cors({
  origin: [process.env.ORIGIN1, process.env.ORIGIN2, process.env.ORIGIN3],
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

app.get('/getDBContent', (req, res) => {
  let dbContent: string[] = [];
  getDBContent().then((value) => {
    dbContent = value.Items;
    console.log(dbContent);
    res.send('DB content:' + dbContent);
  });
});

app.post('/updateDBContent/hoge', (req, res) => {
  let dbContent: string[] = [];
  updateDBContent('fuga').then((value) => {
    dbContent = value.Items;
    res.send('DB content:' + dbContent);
  });
});

app.delete('/deleteDBContent/hoge', (req, res) => {
  let dbContent: string[] = [];
  deleteDBContent('message').then((value) => {
    dbContent = value.Items;
    res.send('DB content:' + dbContent);
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
