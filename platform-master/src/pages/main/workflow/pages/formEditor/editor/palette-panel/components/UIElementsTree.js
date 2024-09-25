import React from "react"
import Typography from "@mui/material/Typography"
import { useDrag } from "react-dnd"

import { DndItems, NEW_UI_SCHEMA_ELEMENT } from "../../core/dnd"
import { StyledTreeItem, StyledTreeView } from "./Tree"

const UiSchemaTreeItem = ({ uiSchemaElementProvider, type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag({
    type: NEW_UI_SCHEMA_ELEMENT,
    item: DndItems.newUISchemaElement(uiSchemaElementProvider()),
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  return (
    <div ref={drag} data-cy={`${type}-source`}>
      <StyledTreeItem
        id={`id-${type}`}
        itemId={`id-${type}`}
        key={type}
        nodeId={type}
        label={label}
        icon={icon}
        isDragging={isDragging}
      ></StyledTreeItem>
    </div>
  )
}

export const UIElementsTree = ({ className, elements }) => {
  return (
    <div className={className}>
      <Typography variant="h6" color="inherit" noWrap>
        Layouts & Forms
      </Typography>
      <StyledTreeView defaultExpanded={[""]}>
        {elements.map(({ id, type, label, icon, uiSchemaElementProvider }) => (
          <UiSchemaTreeItem
            id={`id-${id}`}
            itemId={`id-${id}`}
            key={`treeitem-${type}`}
            type={type}
            label={label}
            icon={icon}
            uiSchemaElementProvider={uiSchemaElementProvider}
          />
        ))}
      </StyledTreeView>
    </div>
  )
}
