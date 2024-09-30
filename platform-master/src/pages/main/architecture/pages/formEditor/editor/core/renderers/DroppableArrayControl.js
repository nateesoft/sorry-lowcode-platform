import React, { useMemo } from "react"
import { isObjectArrayControl, rankWith } from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsArrayControlProps
} from "@jsonforms/react"
import { Typography } from "@mui/material"
import { makeStyles } from "@mui/styles"
import { useDrop } from "react-dnd"

import { useDispatch, useSchema } from "../context"
import {
  canDropIntoScope,
  MOVE_UI_SCHEMA_ELEMENT,
  NEW_UI_SCHEMA_ELEMENT
} from "../dnd"
import { Actions } from "../model"
import { containsControls } from "../model/uischema"
import { DroppableElementRegistration } from "./DroppableElement"

const useStyles = makeStyles({
  root: ({ isOver }) => ({
    padding: 10,
    fontSize: isOver ? "1.1em" : "1em",
    border: isOver ? "1px solid #D3D3D3" : "none"
  })
})

const DroppableArrayControl = ({
  uischema,
  schema,
  path,
  renderers,
  cells
}) => {
  const dispatch = useDispatch()
  const rootSchema = useSchema()
  const [{ isOver, uiSchemaElement }, drop] = useDrop({
    accept: [NEW_UI_SCHEMA_ELEMENT, MOVE_UI_SCHEMA_ELEMENT],
    canDrop: item => {
      switch (item.type) {
        case NEW_UI_SCHEMA_ELEMENT:
          return canDropIntoScope(item, rootSchema, uischema)
        case MOVE_UI_SCHEMA_ELEMENT:
          // move as a new detail is only allowed when there are no controls
          return !containsControls(uiSchemaElement)
        default:
          break;
      }
      // fallback
      return false
    },
    collect: mon => ({
      isOver: !!mon.isOver() && mon.canDrop(),
      uiSchemaElement: mon.getItem()?.uiSchemaElement
    }),
    drop: item => {
      switch (item.type) {
        case NEW_UI_SCHEMA_ELEMENT:
          dispatch(Actions.addDetail(uischema.uuid, uiSchemaElement))
          break
        case MOVE_UI_SCHEMA_ELEMENT:
          dispatch(
            Actions.moveUiSchemaElement(uiSchemaElement.uuid, uischema.uuid, 0)
          )
          break
        default:
          break
      }
    }
  })
  const classes = useStyles({ isOver })

  // DroppableControl removed itself before dispatching to us, we need
  // to re-add it for our children
  const renderersToUse = useMemo(() => {
    return renderers && [...renderers, DroppableElementRegistration]
  }, [renderers])

  if (!uischema.options?.detail) {
    return (
      <Typography ref={drop} className={classes.root}>
        Default array layout. Drag and drop an item here to customize array
        layout.
      </Typography>
    )
  }
  return (
    <JsonFormsDispatch
      schema={schema}
      uischema={uischema.options.detail}
      path={path}
      renderers={renderersToUse}
      cells={cells}
    />
  )
}

export const DroppableArrayControlRegistration = {
  tester: rankWith(40, isObjectArrayControl), // less than DroppableElement
  renderer: withJsonFormsArrayControlProps(DroppableArrayControl)
}
