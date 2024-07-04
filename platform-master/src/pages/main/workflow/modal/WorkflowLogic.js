import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import LogicFlow from "./LogicFlow"

const defaultTheme = createTheme()

export default function WorkflowLogic(props) {
  return (
    <ThemeProvider theme={defaultTheme}>
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
            <LogicFlow id={props.id} onClose={props.onClose} />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
