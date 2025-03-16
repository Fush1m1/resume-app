'use strict';

const express = require('express');
import cors from 'cors';  // Import the CORS module
import { dbStatusMessage } from './repository/db';

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Use CORS middleware
app.use(cors({
  origin: 'https://resume-app-client-czwndnsiq-fush1m1s-projects.vercel.app/',  // Allow only this origin
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
