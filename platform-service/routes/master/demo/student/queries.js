const pool = require("../../dbConnect")

const ResponseClass = require("../../models/response") // optional

const getStudents = (request, response) => {
  const responseReturn = new ResponseClass()
  pool.query("SELECT * FROM students ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error
    }

    responseReturn.status = true
    responseReturn.code = 200
    responseReturn.message = "Success"
    responseReturn.data = results.rows

    response.status(200).json(responseReturn)
  })
}

const getStudentById = (request, response) => {
  const responseReturn = new ResponseClass()
  const id = parseInt(request.params.id)
  pool.query("SELECT * FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    if (results.rowCount == 0) {
      responseReturn.status = true
      responseReturn.code = 404
      responseReturn.message = "User not found"
      responseReturn.data = null
    } else {
      responseReturn.status = true
      responseReturn.code = 200
      responseReturn.message = "Success"
      responseReturn.data = results.rows[0]
    }
    response.status(200).json(responseReturn)
  })
}

const createStudent = (request, response) => {
  const { firstname, lastname, origin } = request.body
  pool.query(
    "INSERT INTO students (firstname, lastname, origin) VALUES ($1, $2, $3)",
    [firstname, lastname, origin],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send("Student added")
    }
  )
}

const updateStudent = (request, response) => {
  const id = parseInt(request.params.id)
  const responseReturn = new ResponseClass()
  try {
    const { firstname, lastname, origin } = request.body
    pool.query(
      "UPDATE students SET firstname = $1, lastname = $2, origin = $3 WHERE id = $4",
      [firstname, lastname, origin, id],
      (error, results) => {
        if (error) {
          throw error
        }

        responseReturn.status = true
        responseReturn.code = 200
        responseReturn.message = "User modification successed"
        responseReturn.data = null
        response.status(200).send(responseReturn)
      }
    )
  } catch (error) {
    responseReturn.status = false
    responseReturn.code = 500
    responseReturn.message = error.message
    responseReturn.data = null
    response.status(500).json(responseReturn)
  }
}

const deleteStudent = (request, response) => {
  const id = parseInt(request.params.id)
  pool.query("DELETE FROM students WHERE id = $1", [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send("Student deleted")
  })
}

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
}
