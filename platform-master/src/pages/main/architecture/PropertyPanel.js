import React, { memo, useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Grid from "@mui/material/Unstable_Grid2"
import { Box, FormControl, MenuItem, Select, TextField, Typography } from "@mui/material"

const PropertyPanel = memo(({ props, onComponentChange }) => {
  const [label, setLabel] = useState("")
  const [languageDev, setLanguageDdev] = useState("")

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
                <Typography variant="caption">Name</Typography>
                <TextField
                 variant="standard"
                  value={label}
                  onChange={(data) => setLabel(data.target.value)}
                  onKeyUp={handleKeyUp}
                />
              </FormControl>
              <FormControl fullWidth>
                <Typography variant="caption">Type</Typography>
                <TextField variant="standard" value={props.type} />
              </FormControl>
              <FormControl variant="standard">
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={languageDev}
                  label="Language Dev"
                  onChange={(evt)=>setLanguageDdev(evt.target.value())}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
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
            </Grid>
          </Grid>
        )}
      </div>
    </>
  )
})

export default PropertyPanel
