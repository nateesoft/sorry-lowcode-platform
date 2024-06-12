import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"

import JsonFormPage from "./pages/JsonFormPage"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [page, setPage] = useState("")

  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

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
                <Typography variant="caption">#Id</Typography>
                <TextField
                  variant="standard"
                  value={props.type + "_" + props.id}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">#Label</Typography>
                <TextField
                  value={label}
                  onChange={(data) => setLabel(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl variant="standard">
                <Typography variant="caption">#Type</Typography>
                <TextField variant="standard" value={props.type} />
              </FormControl>
            </Box>
            {props.type === "page" && (
              <Button
                onClick={() => handlePage("jsonform")}
                variant="contained"
              >
                Preview Page
              </Button>
            )}
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
                />
              )}
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  )
})

export default PropertyPanel
