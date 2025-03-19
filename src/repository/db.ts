// read .env file
import dotenv from 'dotenv';
dotenv.config();

/*
 * Connect to the database and return a status message
 * @returns {Promise<string>} A status message
 */
export async function dbStatusMessage(): Promise<string> {
    let statusMessage: string = "connecting to the database...";
    try {
        runDB();
    } catch (error) {
        statusMessage = `Database connection failed: ${error}`;
        return statusMessage;
    }
    statusMessage = "Connected to the database!";
    return statusMessage;
}

/*
 * Run the DynamoDB connection
 */
import AWS from 'aws-sdk';

function runDB() {
    AWS.config.update({ region: 'ap-northeast-1' });
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME
    };
    dynamodb.scan(params, function (err, data) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Scan succeeded.");
            data.Items.forEach(function (item) {
                console.log("Item :", JSON.stringify(item));
            });
        }
    });
}