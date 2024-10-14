import React from "react"
import { BackupTable, SpaceDashboard, TextRotationNone } from "@mui/icons-material"

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
  createGridLayout,
  createTableData,
  createActionButton,
  createTypography,
  createCategorization,
  createLabel,
  createLayout
} from "../util/generators/uiSchema"

const templateElements = [
  {
    id: 8,
    itemId: 8,
    type: "DashobardSideMenu",
    label: "SideMenu",
    icon: <SpaceDashboard />,
    uiSchemaElementProvider: () => createActionButton("Button")
  },
  {
    id: 9,
    itemId: 9,
    type: "DashobardTopMenu",
    label: "TopMenu",
    icon: <SpaceDashboard />,
    uiSchemaElementProvider: () => createActionButton("Button")
  }
]

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

const componentElements = [
  {
    id: 7,
    itemId: 7,
    type: "GridLayout",
    label: "Grid Layout",
    icon: <GridLayoutIcon />,
    uiSchemaElementProvider: () => createGridLayout()
  },
  {
    id: 6,
    itemId: 6,
    type: "ActionButton",
    label: "Button",
    icon: <SmartButtonIcon />,
    uiSchemaElementProvider: () => createActionButton("Button")
  },
  // {
  //   id: 10,
  //   itemId: 10,
  //   type: "AccordionLayout",
  //   label: "AccordionLayout",
  //   icon: <HorizontalSplit />,
  //   uiSchemaElementProvider: () => createAccordionLayout()
  // },
  {
    id: 11,
    itemId: 11,
    type: "TableData",
    label: "TableData",
    icon: <BackupTable />,
    uiSchemaElementProvider: () => createTableData()
  },
  {
    id: 12,
    itemId: 12,
    type: "Typography",
    label: "Typography",
    icon: <TextRotationNone />,
    uiSchemaElementProvider: () => createTypography("Text")
  }
]

export class DefaultPaletteService {
  getTemplateElements = () => templateElements
  getPaletteElements = () => paletteElements
  getComponentElements = () => componentElements
}
