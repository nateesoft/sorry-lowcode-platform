import React, { useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import { Button, Grid, IconButton, Typography } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"

import PropertieEditor from "../PropertieEditor"

const defaultTheme = createTheme()

export default function ModalEditor(props) {
  console.log("Modal Editor:", props)
  const { id, data, language } = props

  const [content, setContent] = useState(props.content)

  function handleSave() {
    const propsData = JSON.parse(localStorage.getItem(id + "_props"))
    if (propsData) {
      propsData.content = content
      console.log("handleSave:", propsData)
      localStorage.setItem(id + "_props", JSON.stringify(propsData))
      props.onClose()
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container>
        <Grid item xs={10}>
          <Box
            sx={{
              display: "flex",
              padding: "10px 10px"
            }}
          >
            <Typography variant="span">
              Modal Editor - {data.label} - {language}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
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
        </Grid>
      </Grid>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            overflow: "auto",
            height: "70vh",
            padding: "10px"
          }}
        >
          <Box
            component="main"
            sx={{ flexGrow: 1, overflow: "auto", padding: "10px" }}
          >
            <PropertieEditor
              id={props.id}
              onClose={props.onClose}
              language={props.language}
              setContent={setContent}
              content={content}
              props={props}
            />
          </Box>
        </Box>
      </Box>
      <Grid container spacing={1} padding={1} justifyContent="flex-end">
        <Box padding={1}>
          <Button variant="contained" onClick={() => handleSave()}>
            Save
          </Button>
        </Box>
        <Box padding={1}>
          <Button variant="contained" color="error" onClick={props.onClose}>
            Close
          </Button>
        </Box>
      </Grid>
    </ThemeProvider>
  )
}
