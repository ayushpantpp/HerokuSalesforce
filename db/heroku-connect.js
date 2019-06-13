require('dotenv').config()

const { Pool, Client } = require('pg')
const connectionString = process.env.DB_URI
const herokuConnect = new Pool({
  connectionString: connectionString,
  ssl: true
})


module.exports = herokuConnect;
