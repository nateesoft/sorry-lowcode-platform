import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import IconButton from "@mui/material/IconButton"
import { createStyles, makeStyles } from "@mui/styles"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import CloudDownload from "@mui/icons-material/CloudDownload"

import { useExportSchema, useExportUiSchema } from "../util/hooks"
import { ExportDialog } from "./ExportDialog"

const useStyles = makeStyles(() =>
  createStyles({
    title: {
      flexGrow: 1
    }
  })
)

export const Header = () => {
  const classes = useStyles()
  const schema = useExportSchema()
  const uiSchema = useExportUiSchema()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const openDownloadDialog = () => setOpen(true)

  return (
    <AppBar position="static" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
        >
          JSON Forms Editor
        </Typography>
        <IconButton
          aria-label={`Download`}
          onClick={openDownloadDialog}
          color="inherit"
        >
          <CloudDownload />
        </IconButton>
      </Toolbar>
      {open && (
        <ExportDialog
          open={open}
          onClose={onClose}
          schema={schema}
          uiSchema={uiSchema}
        />
      )}
    </AppBar>
  )
}
