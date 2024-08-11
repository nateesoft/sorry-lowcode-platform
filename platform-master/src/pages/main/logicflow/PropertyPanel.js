import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, TextField, Typography } from "@mui/material"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [folder, setFolder] = useState("")
  const [uri, setUri] = useState("")
  const { changeTab } = props;
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
            {changeTab &&
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
                    onClick={() => changeTab(null, 1)}
                    variant="contained"
                    color="warning"
                  >
                    Propertie Editor
                  </Button>
                </Grid>
              </Grid>
            }
          </Grid>
        )}
      </div>
    </>
  )
})

export default PropertyPanel
