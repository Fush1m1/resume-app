// import dotenv from 'dotenv';

// dotenv.config();
// const uri = process.env.MONGODB_URI || '';
// const MongoClient = require('mongodb').MongoClient

// /*
//  * Connect to the database and return a status message
//  * @returns {Promise<string>} A status message
//  */
// export async function dbStatusMessage(): Promise<string> {
//     var statusMessage = undefined;
//     try {
//         runDB();
//         statusMessage = "Connected to the database!";
//     } catch (error) {
//         statusMessage = "Database connection failed:", error;
//     }
//     return statusMessage;
// }

// /*
//  * Connect to the database
//  */
// async function runDB() {
//     MongoClient.connect(uri, (err: any) => {
//         if (err) throw err
//     })
// }
