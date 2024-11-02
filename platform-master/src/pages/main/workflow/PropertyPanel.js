import React, { memo, useEffect, useState, useCallback } from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"
import axios from "axios"
import { useParams } from "react-router-dom"

import JsonFormPage from "./pages/formEditor"
import WorkflowLogic from "../modal"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  console.log("Workflow=>PropertyPanel(props):", props)
  const { id, action } = props
  const { id: workFlowId } = useParams()
  const [boxName, setBoxName] = useState(props.boxName)
  const [boxType, setBoxType] = useState(props.boxType)
  const [folder, setFolder] = useState(props.folder)
  const [uriPath, setUriPath] = useState(props.uriPath)
  const [serviceFlow1, setServiceFlow1] = useState(props.serviceFlow1)
  const [serviceFlow2, setServiceFlow2] = useState(props.serviceFlow2)
  const [page, setPage] = useState("")

  const [open, setOpen] = useState(false)
  const [logicOpen, setLogicOpen] = useState(false)
  const [logicId, setLogicId] = useState(null)
  const handleClose = () => setOpen(false)
  const handleLogicClose = () => setLogicOpen(false)

  const handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      onComponentChange({
        id: props.id,
        label: boxName,
        component: props.component
      })
    }
  }

  function handlePage(page) {
    setOpen(true)
    setPage(page)
  }

  const initLoad = useCallback(() => {
    const {boxName, boxType, folder, uriPath, serviceFlow1, serviceFlow2} = props
    axios
      .get(`/api/master/webapps/workflow-design/${id}`)
      .then((response) => {
        console.log("initLoad: ", response.data)
        if (response.data.code === 200) {
          const { folder, box_name, box_type, uri_path, service_flow_1, service_flow_2 } = response.data.data
          setBoxType(box_type)
          setBoxName(box_name)
          setFolder(folder)
          setUriPath(uri_path)
          setServiceFlow1(service_flow_1)
          setServiceFlow2(service_flow_2)
        } else {
          setBoxType(boxType)
          setBoxName(boxName)
          setFolder(folder)
          setUriPath(uriPath)
          setServiceFlow1(serviceFlow1)
          setServiceFlow2(serviceFlow2)
        }
      })
  }, [id, props])

  function handleSave() {
    console.log('Save source code to API')
    const itemData = {
      id: id,
      box_name: boxName,
      box_type: boxType,
      folder: folder,
      versions: "0.1",
      workflow_id: workFlowId,
      template_uischema: "{}",
      template_schema: "{}",
      template_data: "{}",
      mapping_logic: "{}",
      create_by: "nathee",
      uri_path: "/",
      service_flow_1: serviceFlow1,
      service_flow_2: serviceFlow2
    }
    console.log('itemData:', itemData)
    if ("create" === action) {
      axios
      .post(`/api/master/webapps/workflow-design`, itemData)
      .then((response) => {
        console.log("handleSave(create): ", response.data)
      })
    } else {
      axios
      .put(`/api/master/webapps/workflow-design`, itemData)
      .then((response) => {
        console.log("handleSave(update): ", response.data)
      })
    }
  }

  function handleServiceFlowOpen(id, callback) {
    setLogicId(id)
    callback(true)
  }

  useEffect(() => {
    initLoad()
  }, [initLoad])

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
                <TextField
                  variant="standard"
                  value={props.id}
                />
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
                <TextField variant="standard" value={boxType} />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">URI</Typography>
                <TextField
                 variant="standard"
                  value={uriPath}
                  onChange={data => setUriPath(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Service Flow#1</Typography>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                     variant="standard"
                      value={serviceFlow1}
                      onChange={(data) => setServiceFlow1(data.target.value)}
                      onKeyUp={handleKeyUp}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "snow",
                        color: "black",
                        ":hover": {
                          bgcolor: "#eee"
                        }
                      }}
                      onClick={() => handleServiceFlowOpen("service1_"+props.id, setLogicOpen)}
                    >
                      Open
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Service Flow#2</Typography>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <TextField
                     variant="standard"
                      value={serviceFlow2}
                      onChange={(data) => setServiceFlow2(data.target.value)}
                      onKeyUp={handleKeyUp}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      sx={{
                        bgcolor: "snow",
                        color: "black",
                        ":hover": {
                          bgcolor: "#eee"
                        }
                      }}
                      onClick={() => handleServiceFlowOpen("service2_"+props.id, setLogicOpen)}
                    >
                      Open
                    </Button>
                  </Grid>
                </Grid>
              </FormControl>
            </Box>
            <Grid container spacing={1} padding={1}>
              <Grid item>
                <Button
                  onClick={handleSave}
                  variant="contained"
                >
                  Save Source
                </Button>
              </Grid>
              {props.boxType === "page" && (
                <Grid item>
                  <Button
                    onClick={() => handlePage("jsonform")}
                    variant="contained"
                    color="success"
                  >
                    Preview Page
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        )}
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={1} padding={5}>
          <Grid xs={12}>
            <Box sx={{ bgcolor: "snow" }}>
              {page === "jsonform" && (
                <JsonFormPage
                  onClose={handleClose}
                  id={props.id} 
                  label={boxName}
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Modal>

      <Modal
        open={logicOpen}
        onClose={handleLogicClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Grid container spacing={1} padding={5}>
          <Grid xs={12}>
            <Box sx={{ bgcolor: "snow" }}>
              <WorkflowLogic onClose={handleLogicClose} id={logicId} />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
})

export default PropertyPanel
