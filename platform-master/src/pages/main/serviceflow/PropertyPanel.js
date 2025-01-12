import React, { useCallback, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { Select, MenuItem } from "@mui/material"
import Grid from "@mui/material/Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"
import Modal from "@mui/material/Modal"
import axios from "axios"

import ModalEditor from "./modal"

const PropertyPanel = ({ props, onComponentChange }) => {
  console.log("PropertyPanel(props):", props)
  const { id, serviceFlowId, action } = props
  const [boxName, setBoxName] = useState(props.boxName)
  const [folder, setFolder] = useState(props.folder)
  const [content] = useState("")
  const [outputType, setOutputType] = useState(props.outputType)
  const [language] = useState("javascript")
  const [editorOpen, setEditorOpen] = useState(false)
  const handleClose = () => setEditorOpen(false)

  const handleOpenModal = (data) => {
    setEditorOpen(!editorOpen)
  }

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      onComponentChange({
        id: id,
        label: boxName,
        component: props.component
      })
    }
  }

  const initLoad = useCallback(() => {
    if (!id) return
    axios
      .get(`/api/master/webapps/serviceflow-design/${id}`)
      .then((response) => {
        console.log("initLoad: ", response.data)
        if(response.data.code===200){
          const { folder, box_name, output_type } = response.data.data
          setFolder(folder)
          setBoxName(box_name)
          setOutputType(output_type)
        }else{
          setFolder("")
          setBoxName("")
          setOutputType("")
        }
      })
  }, [id])

  const handleSave = () => {
    const itemData = {
      id,
      serviceflow_id: serviceFlowId,
      folder: folder,
      box_name: boxName,
      box_type: props.boxType,
      from_index_box1: "",
      from_index_box2: "",
      from_index_box3: "",
      from_index_box4: "",
      to_index_box1: "",
      to_index_box2: "",
      to_index_box3: "",
      to_index_box4: "",
      next_process: "",
      editor_logic: "",
      editor_type: "",
      create_by: "natheep",
      output_type: outputType
    }
    if ("create" === action) {
      console.log("create_", itemData)
      axios
        .post(`/api/master/webapps/serviceflow-design`, itemData)
        .then((response) => {
          console.log("handleSave(create): ", response.data)
        })
    } else {
      axios
        .put(`/api/master/webapps/serviceflow-design/${itemData.id}`, itemData)
        .then((response) => {
          console.log("handleSave(update): ", response.data)
        })
    }
  }

  useEffect(() => {
    initLoad()
  }, [])

  if (!id) {
    return <></>
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
                <TextField variant="standard" value={id} />
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
                  value={boxName}
                  onChange={(data) => setBoxName(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Type</Typography>
                <TextField variant="standard" value={props.boxType} />
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
                  <MenuItem value="json">json</MenuItem>
                  <MenuItem value="html">html</MenuItem>
                  <MenuItem value="text">text</MenuItem>
                  <MenuItem value="number">number</MenuItem>
                  <MenuItem value="boolean">boolean</MenuItem>
                </Select>
              </FormControl>
              {props.nextProcess &&
                props.nextProcess.map((item, index) => (
                  <Grid container direction="row">
                    <Grid item xs={8}>
                      <FormControl variant="standard">
                        <Typography variant="caption">
                          Condition ({item.label})
                        </Typography>
                        <TextField variant="standard" value={item.target} />
                      </FormControl>
                    </Grid>
                    <Grid item xs={4} alignContent="end">
                      <Button
                        variant="outlined"
                        onClick={() => handleOpenModal({})}
                      >
                        Open
                      </Button>
                    </Grid>
                  </Grid>
                ))}
            </Box>
            <Grid container spacing={1} padding={1}>
              <Grid item>
                <Button
                  onClick={() => handleSave()}
                  variant="contained"
                  color="success"
                >
                  Save Property
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={() => handleOpenModal({})}
                  variant="contained"
                  color="warning"
                >
                  Property Editor
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
                id={id}
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
}

export default PropertyPanel
