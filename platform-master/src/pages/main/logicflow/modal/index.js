import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import { IconButton } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';

import PropertieEditor from '../PropertieEditor'

const defaultTheme = createTheme()

export default function ModalEditor(props) {
  console.log('Modal Editor:', props)
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{
        display: "flex",
        flexDirection: "row-reverse",
        padding: "5px 14px",
        backgroundColor: "#eee",
        border: "1px dashed grey"
      }}>
        <IconButton aria-label="delete" onClick={props.onClose} size="large">
        <CloseIcon />
      </IconButton>
      </Box>
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
            overflow: "auto", height: "80vh"
          }}
        >
          <Box
            component="main"
            sx={{ flexGrow: 1, overflow: "auto" }}
          >
            <PropertieEditor id={props.id} onClose={props.onClose} language={props.language} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
