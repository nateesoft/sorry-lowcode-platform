import React, { useCallback, useState } from "react"
import Box from "@mui/material/Box"
import { Button, Grid2, IconButton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import axios from "axios"

import PropertieEditor from "../PropertieEditor"

export default function ModalEditor(props) {
  // console.log("Modal Editor:", props)
  const { id, data, language, onClose } = props

  const { editorLogic } = props.data
  const [content, setContent] = useState(editorLogic || "")

  const handleSave = useCallback(()=> {
// const propsData = JSON.parse(localStorage.getItem(id + "_props"))
    // if (propsData) {
    //   propsData.content = content
    //   console.log("handleSave:", propsData)
    //   localStorage.setItem(id + "_props", JSON.stringify(propsData))
    //   props.onClose()
    // }
    axios
      .patch(`/api/master/webapps/serviceflow-design/${id}`, {
        id: id,
        next_process: JSON.stringify(data.nextProcess),
        editor_logic: JSON.stringify(content),
        editor_type: language,
        update_by: "natheep"
      })
      .then((response) => {
        console.log("handleSave: ", response.data)
        props.onClose()
      })
  }, [])

  return (
    <div>
      <Grid2 container spacing={1}>
        <Grid2 size={10}>
          <Box
            sx={{
              display: "flex",
              padding: "10px 10px"
            }}
          >
            <Typography variant="span">
              Modal Editor - {data.boxName} - {language}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              padding: "5px 14px"
            }}
          >
            <IconButton
              aria-label="delete"
              onClick={props.onClose}
              size="large"
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Grid2>
      </Grid2>
      <Grid2 container>
        <PropertieEditor
          id={id}
          onClose={onClose}
          language={language}
          setContent={setContent}
          content={content}
          props={props}
        />
      </Grid2>
      <Grid2 container spacing={1} padding={1} justifyContent="flex-end">
        <Button variant="contained" onClick={handleSave}>
          Save
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </Grid2>
    </div>
  )
}
