import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, Typography } from "@mui/material"

import JsonFormPage from "./pages/JsonFormPage"

const PropertyPanel = memo(
  ({ props, onComponentChange, onShowPage, display }) => {
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
      // onShowPage({ show: true, page: page })
      // display({})
      setPage(page)
    }
    function renderGrapesJsPage(page) {
      onShowPage({ show: true, page: page })
      display({})
    }

    return (
      <>
        <div className="ppanel">
          <Box>
            <Typography>Property</Typography>
          </Box>
          {props && (
            <div className="property">
              <div>Detail</div>
              <div>id: {props.id}</div>
              <div>
                label:{" "}
                <input
                  type="text"
                  value={label}
                  onChange={(data) => setLabel(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </div>
              <div>type: {props.type}</div>
              {props.type === "page" && (
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      onClick={() => renderGrapesJsPage("grapsejs")}
                      variant="contained"
                      color="secondary"
                    >
                      Preview Page (grapsejs)
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      onClick={() => handlePage("jsonform")}
                      variant="contained"
                    >
                      Preview Page (jsonform)
                    </Button>
                  </Grid>
                </Grid>
              )}
            </div>
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
              <Box sx={{bgcolor: 'snow'}}>
                {page === "jsonform" && <JsonFormPage />}
              </Box>
            </Grid>
          </Grid>
        </Modal>
      </>
    )
  }
)

export default PropertyPanel
