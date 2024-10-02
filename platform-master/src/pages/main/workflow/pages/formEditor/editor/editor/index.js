import { materialRenderers } from "@jsonforms/material-renderers"

import { ReactMaterialPreview } from "./components/preview"
import { DroppableArrayControlRegistration } from "../core/renderers/DroppableArrayControl"
import { DroppableCategorizationLayoutRegistration } from "../core/renderers/DroppableCategorizationLayout"
import { DroppableCategoryLayoutRegistration } from "../core/renderers/DroppableCategoryLayout"
import { DroppableElementRegistration } from "../core/renderers/DroppableElement"
import { DroppableGroupLayoutRegistration } from "../core/renderers/DroppableGroupLayout"
import {
  DroppableHorizontalLayoutRegistration,
  DroppableVerticalLayoutRegistration
} from "../core/renderers/DroppableLayout"

// custom layout
import { DroppableGridLayoutRegistration } from "../core/renderers/custom/DroppableGridLayout"
import ActionButton, { actionButtonTester } from "../core/renderers/custom/ActionButton"
import Typography, { typographyTester } from "../core/renderers/custom/Typography"

// import core renderer
// import { renderers } from '../../../components/renderers'

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
  DroppableCategorizationLayoutRegistration,
  DroppableGridLayoutRegistration,
  { tester: actionButtonTester, renderer: ActionButton },
  { tester: typographyTester, renderer: Typography }
]
