require("dotenv").config()

const mysql = require("mysql2")

const pool = mysql.createPool({
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
})

pool.query("SELECT 1 + 1 AS solution", function (error, results, fields) {
  if (error) throw error
  console.log("The solution is: ", results[0].solution)
})

module.exports = pool
