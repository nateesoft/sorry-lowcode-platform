import React from "react"
import { useDrop } from "react-dnd"
import { Typography } from "@mui/material"
import {makeStyles} from "@mui/styles"

import { useDispatch } from "../../core/context"
import { NEW_UI_SCHEMA_ELEMENT } from "../../core/dnd"
import { Actions } from "../../core/model"

const useStyles = makeStyles({
  root: (props) => ({
    padding: 10,
    fontSize: props.isOver ? "1.1em" : "1em",
    border: props.isOver ? "1px solid #D3D3D3" : "none",
    height: "100%"
  })
})

export const EmptyEditor = () => {
  const dispatch = useDispatch()
  const [{ isOver, uiSchemaElement }, drop] = useDrop({
    accept: NEW_UI_SCHEMA_ELEMENT,
    collect: (mon) => {
      return {
        isOver: !!mon.isOver(),
        uiSchemaElement: mon.getItem()
      }
    },
    drop: () => {
      dispatch(Actions.setUiSchema(uiSchemaElement.uiSchemaElement))
    }
  })
  
  const classes = useStyles({ isOver })
  return (
    <div ref={drop} className={classes.root}>
      <Typography data-cy={`nolayout-drop`}>
        Drag and drop an element from the Palette to begin.
      </Typography>
    </div>
  )
}
