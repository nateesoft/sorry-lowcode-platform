require("dotenv").config()

const mysql = require("mysql2")

const util = require('util')
const config = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 3,
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
}

const pool = mysql.createConnection(config)

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error
  console.log("Connect new mysql ip: ", config.host)
  console.log("Connect new mysql version: ", results[0].solution)
  console.log('##### ##### #####')
})

pool.query = util.promisify(pool.query)

module.exports = pool
