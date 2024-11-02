const uuid = require("uuid")
const pool = require("../../dbconfig")

const ResponseClass = require("../../models/response")
const tableName = "webapps_serviceflow"
const tableDetailName = "webapps_serviceflow_design"

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
        response.message = "serviceflow not found"
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
    project_name,
    project_icon,
    workflow_icon,
    serviceflow_name,
    create_by,
    template,
    mapping_logic,
    uri_path
  } = req.body
  pool.query(
    `INSERT INTO ${tableName} 
    (id, project_name, project_icon, workflow_icon, serviceflow_name, 
    create_date, create_by, versions, status, 
    template, mapping_logic, uri_path) 
    VALUES (?, ?, ?, ?, ?, now(), ?, '0.01', 'Y',
    ?, ?, ?)`,
    [
      newId,
      project_name,
      project_icon,
      workflow_icon,
      serviceflow_name,
      create_by,
      template,
      mapping_logic,
      uri_path
    ],
    (err, results) => {
      if (err) throw err
      res.status(201).json({ id: newId })
    }
  )
}

const updateData = (req, res) => {
  const id = req.params.id
  const response = new ResponseClass()
  try {
    const {
      project_name,
      project_icon,
      workflow_icon,
      serviceflow_name,
      update_by,
      versions,
      status,
      template,
      mapping_logic,
      uri_path
    } = req.body
    pool.query(
      `UPDATE ${tableName} 
                SET project_name = ?,
                project_icon = ?,
                workflow_icon = ?,
                serviceflow_name = ?,
                update_date=now(),
                update_by = ?,
                versions = ?,
                status = ?,
                template = ?, 
                mapping_logic = ?, 
                uri_path = ? 
                WHERE id = ?`,
      [
        project_name,
        project_icon,
        workflow_icon,
        serviceflow_name,
        update_by,
        versions,
        status,
        template,
        mapping_logic,
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
    pool.query(`DELETE FROM ${tableDetailName} WHERE serviceflow_id=?`, [id], 
      (err2, result2) => {
        if (err2) throw err2
        res.status(201).send(`Delete service flow id: ${id} success.`)
    })
  })
}

module.exports = {
  getData,
  getDataById,
  createData,
  updateData,
  deleteData
}
