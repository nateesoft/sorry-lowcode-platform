import React, { useState } from "react"
import {
  DialogContent,
  Fade,
  Typography,
  AppBar,
  Button,
  Dialog,
  IconButton,
  createStyles
} from "@mui/material"
import { makeStyles } from "@mui/styles"
import Toolbar from "@mui/material/Toolbar"
import CloseIcon from "@mui/icons-material/CloseOutlined"
import MonacoEditor from "@monaco-editor/react"
import { spacing } from "@mui/system"

const useStyles = makeStyles((theme) =>
  createStyles({
    appBar: {
      position: "relative"
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between"
    },
    title: {
      marginLeft: spacing(2),
      flex: 1
    },
    dialogPaper: {
      height: "100%", // 'MonacoEditor' uses height to grow
      minHeight: "95vh",
      maxHeight: "95vh"
    },
    dialogContent: {
      overflow: "hidden",
      marginTop: "50px",
      flex: 1
    }
  })
)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade ref={ref} {...props} />
})

export const JsonEditorDialog = ({
  open,
  title,
  initialContent,
  type,
  onApply,
  onCancel
}) => {
  const classes = useStyles()
  const [data, setData] = useState(initialContent)

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      TransitionComponent={Transition}
      classes={{ paper: classes.dialogPaper }}
      maxWidth="lg"
      fullWidth
    >
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onCancel}
            aria-label="cancel"
            data-cy="cancel"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" noWrap>
            {title} Text Edit
          </Typography>
          <Button
            variant="contained"
            onClick={() => onApply(data)}
            data-cy="apply"
          >
            Apply
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent className={classes.dialogContent}>
        <MonacoEditor
          defaultLanguage="json"
          defaultValue={initialContent}
          onChange={(editor)=>{
            setData(editor)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
