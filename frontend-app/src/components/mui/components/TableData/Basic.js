import React, { useEffect, useState } from "react"

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { JsonFormsDispatch } from "@jsonforms/react"
import axios from "axios"

async function callService(method, uri, payload = {}) {
  if (method === "get") {
    return await axios.get(uri)
  } else if (method === "post") {
    return await axios.post(uri, payload)
  }
}

const showElement = (id, elm, props) => {
  const {
    schema,
    path,
    enabled,
    renderers,
    cells,
  } = props
  const { elements } = elm.options
  if (elm.type === "element") {
    return (
      <TableCell id={id} align="center">
        {elements.map((child, index) => (
           <JsonFormsDispatch
           key={index}
           uischema={child}
           schema={schema}
           path={path}
           enabled={enabled}
           renderers={renderers}
           cells={cells}
         />
        ))}
      </TableCell>
    )
  }
  return ""
}

const BasicTable = (props) => {
  const {
    mock,
    tableSchema,
    options
  } = props
  const gridSchema = require("../../../../" + tableSchema.schema)
  const gridData = require("../../../../" + tableSchema.data)

  const { showHeader = true } = options
  const [header] = useState(gridSchema || [])
  const [data, setData] = useState(mock.rows || [])

  useEffect(() => {
    (async () => {
      const response = await callService(gridData.method, gridData.uri, {})
      setData(response.data)
    })()
  }, [gridData.method, gridData.uri])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        {showHeader && (
          <TableHead>
            <TableRow>
              {header.map((col) => (
                <TableCell key={col.label} align={col.options.alignItem}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              {header.map((elm) => {
                return showElement(row.id, elm, props)
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BasicTable
