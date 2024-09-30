import React from "react"
import { makeStyles } from "@mui/styles"
import { spacing } from '@mui/system'

const useStyles = makeStyles(theme => ({
  tabContent: {
    padding: spacing(1, 1, 0, 1),
    height: "100%",
    overflow: "auto"
  }
}))

export const TabContent = props => {
  const { children, index, currentIndex, ...other } = props
  const classes = useStyles()
  return (
    <div
      hidden={currentIndex !== index}
      className={classes.tabContent}
      {...other}
    >
      {currentIndex === index && children}
    </div>
  )
}
