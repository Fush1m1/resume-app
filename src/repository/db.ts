import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();
const uri: string = process.env.MONGODB_URI || '';

/*
 * Connect to the database and return a status message
 * @returns {Promise<string>} A status message
 */
export async function dbStatusMessage(): Promise<string> {
    let statusMessage: string = "connecting to the database...";
    try {
        await runDB();
    } catch (error) {
        statusMessage = `Database connection failed: ${error}`;
        return statusMessage;
    }
    statusMessage = "Connected to the database!";
    return statusMessage;
}

/*
 * Connect to the database
 */
async function runDB() {
    //Create a MongoDB client, open a connection to DocDB; as a replica set,
    //  and specify the read preference as secondary preferred
    const client = new MongoClient(uri, { tlsCAFile: `global-bundle.pem` });
    try {
        await client.connect();
        console.log('Connected to the database');

        // Specify the database to be used
        const db = client.db('sample-database');

        // Specify the collection to be used
        const col = db.collection('sample-collection');

        // Insert a single document
        await col.insertOne({ 'hello': 'Amazon DocumentDB' });

        // Find the document that was previously written
        const result = await col.findOne({ 'hello': 'Amazon DocumentDB' });
        console.log(result);
    } catch (err) {
        console.error('Connection failed', err);
        throw err;
    } finally {
        // Close the connection
        await client.close();
    }
}
