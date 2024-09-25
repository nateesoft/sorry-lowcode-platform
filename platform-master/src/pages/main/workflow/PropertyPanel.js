import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"

import JsonFormPage from "./pages/formEditor"
import WorkflowLogic from "../modal"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [folder, setFolder] = useState("")
  const [uri, setUri] = useState("")
  const [serviceFlow1, setServiceFlow1] = useState("")
  const [serviceFlow2, serServiceFlow2] = useState("")
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
  }, [props])

  if (!props.id) {
    return <></>
  }

  function handlePage(page) {
    setOpen(true)
    setPage(page)
  }

  function handleSave() {
    console.log('Save source code to API')
  }

  function handleServiceFlowOpen(id, callback) {
    setLogicId(id)
    callback(true)
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
                <Typography variant="caption">URI</Typography>
                <TextField
                  value={uri}
                  onChange={(data) => setUri(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">Service Flow#1</Typography>
                <Grid container alignItems="center">
                  <Grid item xs={10}>
                    <TextField
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
                      value={serviceFlow2}
                      onChange={(data) => serServiceFlow2(data.target.value)}
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
              {props.type === "page" && (
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
                  id={props.type + "_" + props.id} 
                  label={label}
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
