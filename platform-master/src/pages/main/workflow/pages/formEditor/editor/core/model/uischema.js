import { isLayout } from "@jsonforms/core"
import { cloneDeep } from "lodash"
import { v4 as uuid } from "uuid"

import {
  calculatePath,
  getRoot,
  isEditorControl,
  isEditorLayout,
  isPathError,
  traverse
} from "../util/schemasUtil"
import { getHierarchy } from "../util/tree"

export const getUiSchemaChildren = schemaElement => {
  const children = []
  if (isEditorLayout(schemaElement)) {
    children.push(...schemaElement.elements)
  }
  return children
}

export const hasChildren = schemaElement => {
  return isLayout(schemaElement) && !!schemaElement.elements.length
}

/**
 * Creates a copy of the given ui schema enriched with editor fields
 * like 'parent' and 'linked schema elements'.
 */
export const buildEditorUiSchemaTree = uiSchema => {
  // cast to any so we can freely modify it
  const editorUiSchema = cloneDeep(uiSchema)
  traverse(editorUiSchema, (current, parent) => {
    if (current) {
      current.parent = parent
      current.uuid = uuid()
    }
  })
  return editorUiSchema
}

/**
 * Creates a copy of the given enriched ui schema and removes all editor
 * related fields.
 */
export const buildUiSchema = uiSchema => {
  const clone = cloneDeep(uiSchema)
  traverse(clone, current => {
    delete current.parent
    delete current.linkedSchemaElement
    // delete current.uuid;
  })
  return clone
}

export const buildDebugUISchema = uiSchema => {
  const clone = cloneDeep(uiSchema)
  traverse(clone, current => {
    current.parent = current.parent?.uuid
  })
  return clone
}

export const getUISchemaPath = uiSchema => {
  const root = getRoot(uiSchema)
  const path = calculatePath(root, uiSchema)
  if (isPathError(path)) {
    return path
  }
  // TODO should be done in a cleaner way
  return `/${path.join("/")}`
}

/**
 * Returns the closes element whose detail contains the given element
 */
export const getDetailContainer = element => {
  const parentIsDetail = el => el.parent?.options?.detail?.uuid === el.uuid

  return getHierarchy(element).find(parentIsDetail)?.parent
}

/**
 * Indicates whether the given ui schema element is a control or contains controls
 */
export const containsControls = element =>
  traverse(
    element,
    (el, _parent, acc) => {
      if (isEditorControl(el)) {
        acc.containsControls = true
      }
    },
    { containsControls: false }
  ).containsControls

export const cleanUiSchemaLinks = element => {
  if (!element) {
    return element
  }
  traverse(element, current => {
    delete current.linkedSchemaElement
    return current
  })
  return element
}
