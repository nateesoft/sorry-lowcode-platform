const pool = require("../../dbconfig")

const ResponseClass = require("../../models/response")
const tableName = "company_users_profile"

const getData = (req, res) => {
  const response = new ResponseClass()
  pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`, (err, results) => {
    if (err) throw err

    response.status = true
    response.code = 200
    response.message = "Success"
    response.data = results.rows

    res.status(200).json(response)
  })
}

const getDataById = (req, res) => {
  const response = new ResponseClass()
  const id = parseInt(req.params.id)
  pool.query(`SELECT * FROM ${tableName} WHERE id = $1`, [id], (err, results) => {
    if (err) throw err

    if (results.rowCount == 0) {
      response.status = true
      response.code = 404
      response.message = "User not found"
      response.data = null
    } else {
      response.status = true
      response.code = 200
      response.message = "Success"
      response.data = results.rows[0]
    }

    res.status(200).json(response)
  })
}

const createData = (req, res) => {
  const { firstname, lastname, origin } = req.body
  pool.query(
    `INSERT INTO ${tableName} (firstname, lastname, origin) VALUES ($1, $2, $3)`,
    [firstname, lastname, origin],
    (err, results) => {
      if (err) throw err

      res.status(201).send("Data added")
    }
  )
}

const updateData = (req, res) => {
  const id = parseInt(req.params.id)
  const response = new ResponseClass()
  try {
    const { firstname, lastname, origin } = req.body
    pool.query(
      `UPDATE ${tableName} 
      SET firstname = $1, lastname = $2, origin = $3 
      WHERE id = $4`, [firstname, lastname, origin, id], (err, results) => {
        if (err) throw err

        response.status = true
        response.code = 200
        response.message = "User modification successed"
        response.data = null
        res.status(200).send(response)
      }
    )
  } catch (error) {
    response.status = false
    response.code = 500
    response.message = error.message
    response.data = null
    res.status(500).json(response)
  }
}

const deleteData = (req, res) => {
  const id = parseInt(req.params.id)
  pool.query(`DELETE FROM ${tableName} WHERE id = $1`, [id], (err, results) => {
    if (err) throw err

    res.status(201).send("Data deleted")
  })
}

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData
}
