const pool = require("../../../../dbconfig")

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
        response.message = "Workflow not found"
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
  console.log('createData:', req.body)
  const {
    id,
    box_name,
    box_type,
    folder,
    versions,
    workflow_id,
    template_uischema,
    template_schema,
    template_data,
    mapping_logic,
    create_by,
    uri_path,
    service_flow_1,
    service_flow_2
  } = req.body
  pool.query(
    `INSERT INTO ${tableName} 
    (id, box_name, box_type, folder, versions, 
    workflow_id, template_uischema, template_schema, template_data, mapping_logic, 
    create_at, create_by, uri_path, service_flow_1, service_flow_2) 
    VALUES (?, ?, ?, ?, ?, 
    ?, ?, ?, ?, ?,
    now(), ?, ?, ?, ?)`,
    [
      id,
      box_name,
      box_type,
      folder,
      versions,
      workflow_id,
      template_uischema,
      template_schema,
      template_data,
      mapping_logic,
      create_by,
      uri_path,
      service_flow_1,
      service_flow_2
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
      box_name,
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
        box_name=?,
        versions=?,
        workflow_id=?,
        template_uischema=?,
        template_schema=?,
        template_data=?,
        mapping_logic=?,
        update_by=?,
        uri_path=?,
        service_flow_1=?,
        service_flow_2=? 
        WHERE id = ?`,
      [
        box_name,
        versions,
        workflow_id,
        template_uischema,
        template_schema,
        template_data,
        mapping_logic,
        update_by,
        uri_path,
        service_flow_1,
        service_flow_2,
        id
      ],
      (err, results) => {
        if (err) throw err

        response.status = true
        response.code = 200
        response.message = "Workflow modification successed"
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
