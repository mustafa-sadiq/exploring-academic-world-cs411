const { MongoClient } = require('mongodb');

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);


const dbName = process.env.MONGODB_DB_NAME;


async function connect() {
  
    await client.connect();
    const db = client.db(dbName);

    return db;

}

async function disconnect() {
  await client.close();
}

module.exports = { connect, disconnect };