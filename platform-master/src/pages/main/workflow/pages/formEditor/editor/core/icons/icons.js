import React from "react"
import { styled } from "@mui/material"
import CropFreeIcon from "@mui/icons-material/CropFree"
import Height from "@mui/icons-material/Height"
import InsertLinkIcon from "@mui/icons-material/InsertLink"
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined"
import ListAltIcon from "@mui/icons-material/ListAlt"
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import TabIcon from "@mui/icons-material/Tab"
import TextFieldsIcon from "@mui/icons-material/TextFields"

import { ARRAY, OBJECT, PRIMITIVE } from "../model"

export const VerticalIcon = Height
export const HorizontalIcon = styled(Height)({
  transform: "rotate(90deg)"
})
export const GroupIcon = CropFreeIcon
export const CategorizationIcon = TabIcon
export const CategoryIcon = CropFreeIcon

export const LabelIcon = TextFieldsIcon

export const ControlIcon = InsertLinkIcon
export const ObjectIcon = ListAltIcon
export const ArrayIcon = QueueOutlinedIcon
export const PrimitiveIcon = LabelOutlinedIcon
export const OtherIcon = RadioButtonUncheckedIcon

export const getIconForSchemaType = type => {
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

export const getIconForUISchemaType = type => {
  switch (type) {
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
    default:
      return OtherIcon
  }
}

export const UISchemaIcon = ({ type }) => {
  return React.createElement(getIconForUISchemaType(type), {})
}

export const SchemaIcon = ({ type }) => {
  return React.createElement(getIconForSchemaType(type), {})
}
