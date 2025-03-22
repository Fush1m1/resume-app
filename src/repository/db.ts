import AWS from 'aws-sdk';
import { Res } from '../dto/myFirstDto';

// read .env file
import dotenv from 'dotenv';
dotenv.config();
AWS.config.update({ region: 'ap-northeast-1' });
const dynamodb = new AWS.DynamoDB.DocumentClient();

/*
 * Connect to the database and return a status message
 * @returns {Promise<string>} A status message
 */
export async function dbStatusMessage (): Promise<string> {
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
 * Manipulate the database
 * @returns {Promise<Res>} The data from the database
 */
export async function getDBContent (): Promise<Res> {
    const resData: Res = await readDynamoDB(); // await を使用
    return resData;
}

/*
 * Manipulate the database
 * @returns {Promise<Res>} The data from the database
 */
export async function updateDBContent (key: string): Promise<Res> {
    updateDynamoDBItem('piyo', key);
    return getDBContent();
}

/*
 * Manipulate the database
 * @returns {Promise<Res>} The data from the database
 */
export async function deleteDBContent (key: string): Promise<Res> {
    deleteDynamoDBItem(key);
    return getDBContent();
}

/*
 * Run the DynamoDB connection
 */
function runDB () {
    const params = {
        TableName: process.env.TABLE_NAME
    };
    dynamodb.scan(params, function (err) {
        if (err) {
            console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
        }
    });
}

function readDynamoDB (): Promise<Res> {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME
    };

    const resData: Res = { Items: [] };

    return new Promise((resolve, reject) => {
        dynamodb.scan(params, (err, data) => {
            if (err) {
                console.error("Unable to scan the table. Error JSON:", JSON.stringify(err, null, 2));
                reject(err);
            } else {
                data.Items.forEach(item => {
                    resData.Items.push(JSON.stringify(item));
                });
                resolve(resData);
            }
        });
    });
}

function updateDynamoDBItem (key: string, message: string): void {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME,
        Item: {
            'hoge': key,
            'message': message
        }
    };
    dynamodb.put(params, function (err, data) {
        if (err) {
            console.error("Unable to add item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Added item:", JSON.stringify(data, null, 2));
        }
    });
}

function deleteDynamoDBItem (key: string): void {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: process.env.TABLE_NAME,
        Key: {
            'hoge': key,
        }
    };
    dynamodb.delete(params, function (err, data) {
        if (err) {
            console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Deleted item:", JSON.stringify(data, null, 2));
        }
    });
}