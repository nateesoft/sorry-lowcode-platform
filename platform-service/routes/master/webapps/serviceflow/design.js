const uuid = require("uuid")
const pool = require("../../dbconfig")

const ResponseClass = require("../../models/response")
const tableName = "webapps_serviceflow_design"

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
  const {
    id,
    serviceflow_id,
    folder,
    box_name,
    box_type,
    from_index_box1,
    from_index_box2,
    from_index_box3,
    from_index_box4,
    to_index_box1,
    to_index_box2,
    to_index_box3,
    to_index_box4,
    next_process,
    editor_logic,
    editor_type,
    create_by,
    output_type
  } = req.body
  console.log('req.body=>', req.body)
  pool.query(
    `INSERT INTO ${tableName} 
    (id, serviceflow_id, folder, box_name, box_type,
    from_index_box1, from_index_box2, from_index_box3, from_index_box4,
    to_index_box1, to_index_box2, to_index_box3, to_index_box4, next_process,
    editor_logic, editor_type, create_at, create_by, output_type) 
    VALUES (?, ?, ?, ?, ?,
    ?, ?, ?, ?,
    ?, ?, ?, ?,?,
    ?, ?, now(), ?, ?)`,
    [
      id,
      serviceflow_id,
      folder,
      box_name,
      box_type,
      from_index_box1,
      from_index_box2,
      from_index_box3,
      from_index_box4,
      to_index_box1,
      to_index_box2,
      to_index_box3,
      to_index_box4,
      next_process,
      editor_logic,
      editor_type,
      create_by,
      output_type
    ],
    (err, results) => {
      if (err) throw err
      res.status(201).json({ id })
    }
  )
}

const updateData = (req, res) => {
  const id = req.params.id
  const response = new ResponseClass()
  try {
    const {
      serviceflow_id,
      folder,
      box_name,
      box_type,
      from_index_box1,
      from_index_box2,
      from_index_box3,
      from_index_box4,
      to_index_box1,
      to_index_box2,
      to_index_box3,
      to_index_box4,
      next_process,
      editor_logic,
      editor_type,
      update_by,
      output_type
    } = req.body
    pool.query(
      `UPDATE ${tableName} 
        SET serviceflow_id=?,
      folder=?,
      box_name=?,
      box_type=?,
      from_index_box1=?,
      from_index_box2=?,
      from_index_box3=?,
      from_index_box4=?,
      to_index_box1=?,
      to_index_box2=?,
      to_index_box3=?,
      to_index_box4=?,
      next_process=?,
      editor_logic=?,
      editor_type=?,
      update_at=now(),
      update_by =?, 
      output_type=?  WHERE id = ?`,
      [
        serviceflow_id,
        folder,
        box_name,
        box_type,
        from_index_box1,
        from_index_box2,
        from_index_box3,
        from_index_box4,
        to_index_box1,
        to_index_box2,
        to_index_box3,
        to_index_box4,
        next_process,
        editor_logic,
        editor_type,
        update_by,
        output_type,
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
