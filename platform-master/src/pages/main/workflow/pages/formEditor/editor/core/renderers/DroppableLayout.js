import React from "react"
import { useDrop } from "react-dnd"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import {
  JsonFormsDispatch,
  withJsonFormsLayoutProps
} from "@jsonforms/react"
import { Grid } from "@mui/material"
import {makeStyles} from "@mui/styles"
import { spacing } from '@mui/system'

import { useDispatch, useSchema } from "../context"
import {
  canDropIntoLayout,
  canMoveSchemaElementTo,
  MOVE_UI_SCHEMA_ELEMENT,
  NEW_UI_SCHEMA_ELEMENT
} from "../dnd"
import { Actions } from "../model"
import { getUISchemaPath } from "../model/uischema"
import { isPathError } from "../util/schemasUtil"
import { DroppableElementRegistration } from "./DroppableElement"

const useLayoutStyles = makeStyles(() => ({
  jsonformsGridItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  }
}))

export const DroppableLayout = ({
  schema,
  layout,
  path,
  direction,
  renderers,
  cells
}) => {
  console.log('DroppableLayout:', layout)
  const classes = useLayoutStyles()
  return (
    <Grid
      container
      direction={direction}
      spacing={direction === "row" ? 2 : 0}
      wrap="nowrap"
    >
      <DropPoint index={0} layout={layout} key={`${path}-${0}-drop`} />
      {layout.elements.map((child, index) => (
        <React.Fragment key={`${path}-${index}-fragment`}>
          <Grid
            item
            key={`${path}-${index}`}
            className={classes.jsonformsGridItem}
            xs
          >
            <JsonFormsDispatch
              uischema={child}
              schema={schema}
              path={path}
              renderers={
                renderers && [...renderers, DroppableElementRegistration]
              }
              cells={cells}
            />
          </Grid>
          <DropPoint
            index={index + 1}
            layout={layout}
            key={`${path}-${index + 1}-drop`}
          />
        </React.Fragment>
      ))}
    </Grid>
  )
}

const useDropPointStyles = makeStyles(theme => ({
  dropPointGridItem: props => ({
    padding: spacing(1),
    backgroundImage: props.isOver
      ? "radial-gradient(#c8c8c8 1px, transparent 1px)"
      : "none",
    backgroundSize: "calc(10 * 1px) calc(10 * 1px)",
    backgroundClip: "content-box",
    minWidth: "2em",
    minHeight: props.isOver ? "8em" : "2em",
    maxWidth: props.fillWidth || props.isOver ? "inherit" : "2em"
  })
}))

const DropPoint = ({ layout, index }) => {
  const dispatch = useDispatch()
  const rootSchema = useSchema()
  const [{ isOver, uiSchemaElement, schemaUUID }, drop] = useDrop({
    accept: [NEW_UI_SCHEMA_ELEMENT, MOVE_UI_SCHEMA_ELEMENT],
    canDrop: (item, monitor) => {
      switch (item.type) {
        case NEW_UI_SCHEMA_ELEMENT:
          return canDropIntoLayout(item, rootSchema, layout)
        case MOVE_UI_SCHEMA_ELEMENT:
          return canMoveSchemaElementTo(item, layout, index)
        default:
          break;
      }
      // fallback
      return false
    },
    collect: mon => ({
      isOver: !!mon.isOver() && mon.canDrop(),
      uiSchemaElement: mon.getItem()?.uiSchemaElement,
      schemaUUID: mon.getItem()?.schemaUUID
    }),
    drop: item => {
      switch (item.type) {
        case NEW_UI_SCHEMA_ELEMENT:
          schemaUUID
            ? dispatch(
                Actions.addScopedElementToLayout(
                  uiSchemaElement,
                  layout.uuid,
                  index,
                  schemaUUID
                )
              )
            : dispatch(
                Actions.addUnscopedElementToLayout(
                  uiSchemaElement,
                  layout.uuid,
                  index
                )
              )
          break
        case MOVE_UI_SCHEMA_ELEMENT:
          dispatch(
            Actions.moveUiSchemaElement(
              uiSchemaElement.uuid,
              layout.uuid,
              index,
              schemaUUID
            )
          )
          break
        default:
          break
      }
    }
  })

  const fillWidth =
    layout.type !== "HorizontalLayout" || layout.elements.length === 0

  const classes = useDropPointStyles({ isOver, fillWidth })
  return (
    <Grid
      item
      container
      ref={drop}
      className={classes.dropPointGridItem}
      data-cy={`${getDataPath(layout)}-drop-${index}`}
      xs
    ></Grid>
  )
}

const getDataPath = uischema => {
  const path = getUISchemaPath(uischema)
  if (isPathError(path)) {
    console.error("Could not calculate data-cy path for DropPoint", path)
    return ""
  }
  return path
}

const createRendererInDirection = direction => ({
  uischema,
  path,
  renderers,
  ...props
}) => {
  const layout = uischema
  return (
    <DroppableLayout
      {...props}
      path={path}
      layout={layout}
      direction={direction}
      renderers={renderers}
    />
  )
}

export const DroppableHorizontalLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("HorizontalLayout")),
  renderer: withJsonFormsLayoutProps(createRendererInDirection("row"))
}
export const DroppableVerticalLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("VerticalLayout")),
  renderer: withJsonFormsLayoutProps(createRendererInDirection("column"))
}
