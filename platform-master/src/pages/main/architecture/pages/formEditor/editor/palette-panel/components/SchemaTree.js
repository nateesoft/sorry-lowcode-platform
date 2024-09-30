import React from "react"
import { useDrag } from "react-dnd"
import {Typography} from "@mui/material"
import { v4 as uuid } from 'uuid'

import { DndItems, NEW_UI_SCHEMA_ELEMENT } from "../../core/dnd"
import { SchemaIcon } from "../../core/icons"
import {
  getChildren,
  getLabel,
  getPath,
  isArrayElement,
  isObjectElement
} from "../../core/model/schema"
import { createControl } from "../../core/util/generators/uiSchema"
import { StyledTreeItem, StyledTreeView } from "./Tree"

const SchemaTreeItem = ({ schemaElement }) => {
  const uiSchemaElement = createControl(schemaElement)

  const [{ isDragging }, drag] = useDrag({
    type: NEW_UI_SCHEMA_ELEMENT,
    item: DndItems.newUISchemaElement(uiSchemaElement, schemaElement.uuid),
    canDrag: () => {
      return schemaElement.schema.type !== "object"
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  const schemaElementPath = getPath(schemaElement)
  const id = uuid()
  return (
    <div ref={drag} data-cy={`${schemaElementPath}-source`}>
      <StyledTreeItem
        itemId={id}
        key={schemaElementPath}
        nodeId={schemaElementPath}
        label={getLabel(schemaElement)}
        icon={<SchemaIcon type={schemaElement.type} />}
        isDragging={isDragging}
      >
        {getChildrenToRender(schemaElement).map(child => (
          <SchemaTreeItem id={getPath(child)} itemId={getPath(child)} schemaElement={child} key={getPath(child)} />
        ))}
      </StyledTreeItem>
    </div>
  )
}

const getChildrenToRender = schemaElement => {
  return getChildren(schemaElement).flatMap(child => {
    // if the child is the only item of an array, use its children instead
    if (
      isObjectElement(child) &&
      isArrayElement(child.parent) &&
      child.parent.items === child
    ) {
      return getChildren(child)
    }
    return [child]
  })
}

export const SchemaTreeView = ({ schema }) => {
  return (
    <>
      <Typography variant="h6" color="inherit" noWrap>
        Controls
      </Typography>
      {schema !== undefined ? (
        <StyledTreeView defaultExpanded={[""]}>
          <SchemaTreeItem schemaElement={schema} />
        </StyledTreeView>
      ) : (
        <NoSchema />
      )}
    </>
  )
}

const NoSchema = () => <div>No JSON Schema available</div>
