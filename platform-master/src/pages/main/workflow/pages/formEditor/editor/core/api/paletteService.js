import React from "react"

import {
  CategorizationIcon,
  GroupIcon,
  HorizontalIcon,
  LabelIcon,
  VerticalIcon
} from "../icons"
import {
  createCategorization,
  createLabel,
  createLayout
} from "../util/generators/uiSchema"

const paletteElements = [
  {
    id: 1,
    itemId: 1,
    type: "HorizontalLayout",
    label: "Horizontal Layout",
    icon: <HorizontalIcon />,
    uiSchemaElementProvider: () => createLayout("HorizontalLayout")
  },
  {
    id: 2,
    itemId: 2,
    type: "VerticalLayout",
    label: "Vertical Layout",
    icon: <VerticalIcon />,
    uiSchemaElementProvider: () => createLayout("VerticalLayout")
  },
  {
    id: 3,
    itemId: 3,
    type: "Group",
    label: "Group",
    icon: <GroupIcon />,
    uiSchemaElementProvider: () => createLayout("Group")
  },
  {
    id: 4,
    itemId: 4,
    type: "Label",
    label: "Label",
    icon: <LabelIcon />,
    uiSchemaElementProvider: () => createLabel()
  },
  {
    id: 5,
    itemId: 5,
    type: "Categorization",
    label: "Categorization",
    icon: <CategorizationIcon />,
    uiSchemaElementProvider: () => createCategorization()
  }
]

export class DefaultPaletteService {
  getPaletteElements = () => paletteElements
}
