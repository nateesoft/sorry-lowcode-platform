import React, { useEffect, useState, memo } from "react"

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

const BasicTable = (props) => {
  // console.log("BasicTable:", props)
  const {
    schema,
    path,
    enabled,
    renderers,
    cells,
    mock,
    tableSchema,
    options
  } = props
  const { initLoad = false} = tableSchema
  const gridSchema = require("../../../../../../" + tableSchema.uischema)
  const serviceData = require("../../../../../../" + tableSchema.service)

  const { showHeader = true } = options
  const [header] = useState(gridSchema || [])
  const [data, setData] = useState(mock.rows || [])

  useEffect(() => {
    if(initLoad){
      (async () => {
        const response = await callService(
          serviceData.method,
          serviceData.uri,
          {}
        )
        // console.log("response:", response)
        const newResp = response.data.map((rItem, index) => {
          const actionRow = header.filter((item) => item.type === "element")[0]
          let valueActionRow = JSON.stringify(actionRow)
          Object.keys(rItem).forEach((key) => {
            valueActionRow = valueActionRow.replace(
              new RegExp("#" + key, "g"),
              rItem[key]
            )
          })
          return {
            ...rItem,
            action_row: JSON.parse(valueActionRow).options.elements
          }
        })
        // console.log("newResp:", newResp)
        setData(newResp)
      })()
    }
  }, [serviceData.method, serviceData.uri, header, initLoad])

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
          {data &&
            data.map((row, index) => (
              <TableRow
                key={index + row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="right">
                  {row.action_row && (
                    <JsonFormsDispatch
                      key={row.id + index}
                      uischema={row.action_row[0]}
                      schema={schema}
                      path={path}
                      enabled={enabled}
                      renderers={renderers}
                      cells={cells}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const customComparator = (prevProps, nextProps) => {
  return nextProps.schema === prevProps.schema
}

export default memo(BasicTable, customComparator)
