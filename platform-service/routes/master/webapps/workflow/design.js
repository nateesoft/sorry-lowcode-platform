const uuid = require("uuid")
const pool = require("../../dbconfig")

const ResponseClass = require("../../models/response")
const tableName = "webapps_workflow_design"

const getData = (req, res) => {
  const response = new ResponseClass()
  pool.query(`SELECT * FROM ${tableName} ORDER BY id ASC`, (err, results) => {
    if (err) throw err

    response.status = true
    response.code = 200
    response.message = "Success"
    response.data = results

    res.status(200).json(response)
  })
}

const getDataById = (req, res) => {
  const response = new ResponseClass()
  const id = req.params.id
  pool.query(
    `SELECT * FROM ${tableName} WHERE id = ?`,
    [id],
    (err, results) => {
      if (err) throw err

      if (results.length == 0) {
        response.status = true
        response.code = 404
        response.message = "User not found"
        response.data = null
      } else {
        response.status = true
        response.code = 200
        response.message = "Success"
        response.data = results[0]
      }

      res.status(200).json(response)
    }
  )
}

const createData = (req, res) => {
  const newId = uuid.v4()
  const {
    name,
    versions,
    workflow_id,
    template_uischema,
    template_schema,
    template_data,
    mapping_logic,
    create_by,
    uri_path
  } = req.body
  pool.query(
    `INSERT INTO ${tableName} 
    (id, name, versions, workflow_id, template_uischema, template_schema, template_data, mapping_logic, 
    create_at, create_by, uri_path) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, now(), ?, ?)`,
    [
      newId,
      name,
      versions,
      workflow_id,
      template_uischema,
      template_schema,
      template_data,
      mapping_logic,
      create_by,
      uri_path
    ],
    (err, results) => {
      if (err) throw err

      res.status(201).send("Data added")
    }
  )
}

const updateData = (req, res) => {
  const id = req.params.id
  const response = new ResponseClass()
  try {
    const {
      name,
      versions,
      workflow_id,
      template_uischema,
      template_schema,
      template_data,
      mapping_logic,
      update_by,
      uri_path
    } = req.body
    pool.query(
      `UPDATE ${tableName} 
        SET 
        name=?,
        versions=?,
        workflow_id=?,
        template_uischema=?,
        template_schema=?,
        template_data=?,
        mapping_logic=?,
        create_by=?,
        uri_path=? 
        WHERE id = ?`,
      [
        name,
        versions,
        workflow_id,
        template_uischema,
        template_schema,
        template_data,
        mapping_logic,
        update_by,
        uri_path,
        id
      ],
      (err, results) => {
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
  const id = req.params.id
  pool.query(`DELETE FROM ${tableName} WHERE id = ?`, [id], (err, results) => {
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
