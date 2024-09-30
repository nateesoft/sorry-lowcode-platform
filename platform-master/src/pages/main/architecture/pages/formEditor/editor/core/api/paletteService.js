import React from "react"

import {
  CategorizationIcon,
  GridLayoutIcon,
  GroupIcon,
  HorizontalIcon,
  LabelIcon,
  SmartButtonIcon,
  VerticalIcon
} from "../icons"
import {
  createActionButton,
  createCategorization,
  createLabel,
  createLayout,
  createGridLayout
} from "../util/generators/uiSchema"

const paletteElements = [
  {
    id: 1,
    itemId: 1,
    type: "GridLayout",
    label: "Grid Layout",
    icon: <GridLayoutIcon />,
    uiSchemaElementProvider: () => createGridLayout()
  },
  {
    id: 2,
    itemId: 2,
    type: "HorizontalLayout",
    label: "Horizontal Layout",
    icon: <HorizontalIcon />,
    uiSchemaElementProvider: () => createLayout("HorizontalLayout")
  },
  {
    id: 3,
    itemId: 3,
    type: "VerticalLayout",
    label: "Vertical Layout",
    icon: <VerticalIcon />,
    uiSchemaElementProvider: () => createLayout("VerticalLayout")
  },
  {
    id: 4,
    itemId: 4,
    type: "Group",
    label: "Group",
    icon: <GroupIcon />,
    uiSchemaElementProvider: () => createLayout("Group")
  },
  {
    id: 5,
    itemId: 5,
    type: "Label",
    label: "Label",
    icon: <LabelIcon />,
    uiSchemaElementProvider: () => createLabel()
  },
  {
    id: 6,
    itemId: 6,
    type: "Categorization",
    label: "Categorization",
    icon: <CategorizationIcon />,
    uiSchemaElementProvider: () => createCategorization()
  }
]

const componentElements = [
  {
    id: 7,
    itemId: 7,
    type: "ActionButton",
    label: "Button",
    icon: <SmartButtonIcon />,
    uiSchemaElementProvider: () => createActionButton("Button")
  }
]

export class DefaultPaletteService {
  getPaletteElements = () => paletteElements
  getComponentElements = () => componentElements
}
