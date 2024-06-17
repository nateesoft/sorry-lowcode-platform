import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import WorkFlow from "./workflow"

const defaultTheme = createTheme()

export default function Main() {
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
            overflow: "auto"
          }}
        >
          <Box
            component="main"
            sx={{ flexGrow: 1, overflow: "auto" }}
          >
            <WorkFlow />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
