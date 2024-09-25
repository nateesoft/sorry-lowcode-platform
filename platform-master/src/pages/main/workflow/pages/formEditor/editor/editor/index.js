import { materialRenderers } from "@jsonforms/material-renderers"

import { DroppableArrayControlRegistration } from "../core/renderers/DroppableArrayControl"
import { DroppableCategorizationLayoutRegistration } from "../core/renderers/DroppableCategorizationLayout"
import { DroppableCategoryLayoutRegistration } from "../core/renderers/DroppableCategoryLayout"
import { DroppableElementRegistration } from "../core/renderers/DroppableElement"
import { DroppableGroupLayoutRegistration } from "../core/renderers/DroppableGroupLayout"
import {
  DroppableHorizontalLayoutRegistration,
  DroppableVerticalLayoutRegistration
} from "../core/renderers/DroppableLayout"
import { ReactMaterialPreview } from "./components/preview"

export * from "./components/EditorPanel"
export { EditorElement } from "./components/EditorElement"

export const defaultEditorTabs = [
  { name: "Preview", Component: ReactMaterialPreview }
]

export const defaultEditorRenderers = [
  ...materialRenderers,
  DroppableHorizontalLayoutRegistration,
  DroppableVerticalLayoutRegistration,
  DroppableElementRegistration,
  DroppableGroupLayoutRegistration,
  DroppableCategoryLayoutRegistration,
  DroppableArrayControlRegistration,
  DroppableCategorizationLayoutRegistration
]
