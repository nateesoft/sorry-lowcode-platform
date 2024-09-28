import { createElement } from "react"
import { styled } from "@mui/material"
import {
  QueueOutlined,
  RadioButtonUnchecked,
  CropFree,
  InsertLink,
  LabelOutlined,
  ListAlt,
  Height,
  Tab,
  TextFields,
  SmartButton,
  GridView
} from "@mui/icons-material"

import { ARRAY, OBJECT, PRIMITIVE } from "../model"

export const VerticalIcon = Height
export const HorizontalIcon = styled(Height)({
  transform: "rotate(90deg)"
})
export const GridLayoutIcon = GridView
export const GroupIcon = CropFree
export const CategorizationIcon = Tab
export const CategoryIcon = CropFree

export const LabelIcon = TextFields

export const ControlIcon = InsertLink
export const ObjectIcon = ListAlt
export const ArrayIcon = QueueOutlined
export const PrimitiveIcon = LabelOutlined
export const OtherIcon = RadioButtonUnchecked
export const SmartButtonIcon = SmartButton

export const getIconForSchemaType = (type) => {
  switch (type) {
    case OBJECT:
      return ObjectIcon
    case ARRAY:
      return ArrayIcon
    case PRIMITIVE:
      return PrimitiveIcon
    default:
      return OtherIcon
  }
}

export const getIconForUISchemaType = (type) => {
  console.log('getIconForUISchemaType:', type)
  switch (type) {
    case "GridLayout":
      return GridLayoutIcon
    case "HorizontalLayout":
      return HorizontalIcon
    case "VerticalLayout":
      return VerticalIcon
    case "Group":
      return GroupIcon
    case "Category":
      return CategoryIcon
    case "Categorization":
      return CategorizationIcon
    case "Control":
      return ControlIcon
    case "Label":
      return LabelIcon
    case "ActionButton":
      return SmartButtonIcon
    default:
      return OtherIcon
  }
}

export const UISchemaIcon = ({ type }) => {
  return createElement(getIconForUISchemaType(type), {})
}

export const SchemaIcon = ({ type }) => {
  return createElement(getIconForSchemaType(type), {})
}
