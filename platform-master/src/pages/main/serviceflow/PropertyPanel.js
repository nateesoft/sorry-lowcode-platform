import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { Select, MenuItem } from "@mui/material"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"
import Modal from "@mui/material/Modal"

import ModalEditor from "./modal"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [folder, setFolder] = useState("")
  const [content, setContent] = useState("")
  const [outputType, setOutputType] = useState("")
  const [language, setLanguage] = useState("javascript")
  // const [uri, setUri] = useState("")
  const [editorOpen, setEditorOpen] = useState(false)
  const handleClose = () => setEditorOpen(false)

  console.log("PropertyPanel:", props)

  const handleOpenModal = (data) => {
    setEditorOpen(!editorOpen)
  }

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      onComponentChange({
        id: props.id,
        label: label,
        component: props.component
      })
    }
  }

  useEffect(() => {
    if (props.label) {
      setLabel(props.label)
    } else {
      setLabel("")
    }
    if (props.folder) {
      setFolder(props.folder)
    } else {
      setFolder("")
    }
    if (props.type === "payload") {
      setLanguage("json")
    } else {
      setLanguage("javascript")
    }

    // load folder and outputType
    const data = JSON.parse(localStorage.getItem(props.id+"_props"))
    if(data){
      setFolder(data.folder||'')
      setOutputType(data.outputType||'')
      setContent(data.content)
    }
  }, [props])

  if (!props.id) {
    return <></>
  }

  function handleSave() {
    console.log("Save source code to API")
    localStorage.setItem(props.id + "_props", JSON.stringify({
      folder, 
      label, 
      outputType, 
      nextProcess: props.nextProcess
    }))
  }

  return (
    <>
      <div className="ppanel">
        <Grid container direction="column" alignItems="center">
          <Typography variant="h5">Property</Typography>
        </Grid>
        {props && (
          <Grid container justifyContent="flex-end">
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1 }
              }}
              noValidate
              autoComplete="off"
            >
              <FormControl variant="standard">
                <Typography variant="caption">Index</Typography>
                <TextField variant="standard" value={props.id} />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Folder</Typography>
                <TextField
                 variant="standard"
                  value={folder}
                  onChange={(data) => setFolder(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Name</Typography>
                <TextField
                 variant="standard"
                  value={label}
                  onChange={(data) => setLabel(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Type</Typography>
                <TextField variant="standard" value={props.type} />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Output Type</Typography>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={outputType}
                  label="Age"
                  onChange={(evt) => setOutputType(evt.target.value)}
                >
                  <MenuItem value={"json"}>json</MenuItem>
                  <MenuItem value={"text"}>text</MenuItem>
                  <MenuItem value={"number"}>number</MenuItem>
                </Select>
              </FormControl>
              {props.nextProcess && props.nextProcess.map((item, index) => (
                <Grid container direction="row">
                  <Grid item xs={8}>
                    <FormControl variant="standard">
                      <Typography variant="caption">Condition ({item.label})</Typography>
                      <TextField variant="standard" value={item.target} />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4} alignContent="end">
                    <Button variant="outlined" onClick={() => handleOpenModal({})}>Open</Button>
                  </Grid>
                </Grid>
              ))}
            </Box>
            <Grid container spacing={1} padding={1}>
              <Grid item>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  color="success"
                >
                  Save Source
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => handleOpenModal({})}
                  variant="contained"
                  color="warning"
                >
                  Propertie Editor
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>

      <Modal
        open={editorOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={1} padding={5}>
          <Grid xs={12}>
            <Box sx={{ bgcolor: "snow" }}>
              <ModalEditor
                onClose={handleClose}
                id={props.id}
                content={content}
                data={props}
                language={language}
              />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
})

export default PropertyPanel
