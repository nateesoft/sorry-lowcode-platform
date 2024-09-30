import React from "react"
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@mui/material"

export const OkCancelDialog = ({ open, title = "", text, onOk, onCancel }) => {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary" data-cy="cancel-button">
          Cancel
        </Button>
        <Button onClick={onOk} color="primary" autoFocus data-cy="ok-button">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
