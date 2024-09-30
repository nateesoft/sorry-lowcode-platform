import React, { useState } from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Hidden from '@mui/material/Hidden';
import { createStyles, makeStyles } from "@mui/styles"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import Cancel from "@mui/icons-material/Cancel"
import { spacing } from '@mui/system'

import { FormattedJson } from './Formatted';

const useStyles = makeStyles(theme =>
  createStyles({
    button: {
      margin: spacing(1)
    },
    title: {
      textAlign: "center"
    },
    content: {
      maxHeight: "90vh",
      height: "90vh"
    }
  })
)

export const ExportDialog = ({ open, onClose, schema, uiSchema }) => {
  const classes = useStyles()
  const [selectedTab, setSelectedTab] = useState(0)
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue)
  }
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="export-dialog-title"
      aria-describedby="export-dialog-description"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle className={classes.title} id="export-dialog-title">
        {"Export"}
      </DialogTitle>
      <DialogContent className={classes.content}>
        <Tabs value={selectedTab} onChange={handleTabChange}>
          <Tab label="Schema" />
          <Tab label="UI Schema" />
        </Tabs>
        <Hidden xsUp={selectedTab !== 0}>
          <FormattedJson object={schema} />
        </Hidden>
        <Hidden xsUp={selectedTab !== 1}>
          <FormattedJson object={uiSchema} />
        </Hidden>
      </DialogContent>
      <DialogActions>
        <Button
          aria-label={"Close"}
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<Cancel />}
          onClick={onClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
