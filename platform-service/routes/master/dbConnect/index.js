require('dotenv').config()

const Pool = require("pg").Pool

console.log(process.env)

const pool = new Pool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  options: process.env.DB_OPTIONS
})

module.exports = pool
