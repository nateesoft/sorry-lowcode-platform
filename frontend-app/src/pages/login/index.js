/**
 *
 * Login
 *
 */

import React, { useEffect, useState } from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import axios from "axios"

import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

import { renderers } from "../../components/renderers"

import uischema from "./uischema.json"
import schema from "./schema.json"
import data from "./data.json"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "orange",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
}

async function callService(method, uri, payload={}) {
  if (method === "get") {
    return await axios.get(uri)
  } else if (method === "post") {
    return await axios.post(uri, payload)
  }
}

async function initLoad(setOpen, setErrMsg) {
  console.log("init load Login")
  try {
    const { data: response } = await callService("get", "/api/login", {})
    console.log(response)
  } catch (error) {
    setOpen(true)
    setErrMsg({
      title: "API Connection Failure!",
      message: error.message
    })
  }
}

function Login() {
  const [open, setOpen] = useState(false)
  const [errMsg, setErrMsg] = useState({})

  const handleClose = () => setOpen(false)

  useEffect(() => {
    initLoad(setOpen, setErrMsg)
  }, [])

  const handleChange = ({error, data}) => {
    console.log(data)
  }

  return (
    <>
      <JsonForms
        schema={schema}
        uischema={uischema}
        data={data}
        renderers={renderers}
        cells={materialCells}
        onChange={handleChange}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {errMsg.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {errMsg.message}
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

export default Login
