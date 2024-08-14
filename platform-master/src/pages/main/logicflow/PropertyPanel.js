import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"
import Modal from "@mui/material/Modal"

import ModalEditor from './modal'

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [folder, setFolder] = useState("")
  const [language, setLanguage] = useState("javascript")
  const [uri, setUri] = useState("")
  const [editorOpen, setEditorOpen] = useState(false)
  const handleClose = () => setEditorOpen(false)

  console.log('PropertyPanel:', props)

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
    if(props.type === "inputOutput"){
      setLanguage("json")
    }else{
      setLanguage("javascript")
    }
  }, [props])

  if (!props.id) {
    return <></>
  }

  function handleSave() {
    console.log('Save source code to API')
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
                <TextField
                  variant="standard"
                  value={props.type + "_" + props.id}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Folder</Typography>
                <TextField
                  value={folder}
                  onChange={(data) => setFolder(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Name</Typography>
                <TextField
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
                <Typography variant="caption">Json Schema</Typography>
                <TextField
                  id="filled-multiline-flexible"
                  label="# payload"
                  multiline
                  maxRows={4}
                  variant="filled"
                  value={uri}
                  onChange={(data) => setUri(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
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
                  onClick={()=>setEditorOpen(true)}
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
              <ModalEditor onClose={handleClose} id={props.id} language={language} />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
})

export default PropertyPanel
