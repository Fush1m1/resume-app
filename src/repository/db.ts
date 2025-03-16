import dotenv from 'dotenv';

dotenv.config();
const uri:string = process.env.MONGODB_URI || '';
const MongoClient = require('mongodb').MongoClient

/*
 * Connect to the database and return a status message
 * @returns {Promise<string>} A status message
 */
export async function dbStatusMessage(): Promise<string> {
    var statusMessage: string = "connecting to the database...";
    try {
        await runDB();
    } catch (error) {
        statusMessage = "Database connection failed:", error;
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

    var client = MongoClient.connect(
    uri,
    {
    tlsCAFile: `global-bundle.pem` //Specify the DocDB; cert
    },
    function(err, client) {
        if(err)
            throw err;

        //Specify the database to be used
        var db = client.db('sample-database');

        //Specify the collection to be used
        var col = db.collection('sample-collection');

        //Insert a single document
        col.insertOne({'hello':'Amazon DocumentDB'}, function(err, result){
            //Find the document that was previously written
            col.findOne({'hello':'Amazon DocumentDB'}, function(err, result){
                //Print the result to the screen
                console.log(result);

                //Close the connection
                client.close()
            });
        });
    });
}