import { getArrayContainer } from "../model"
import { containsControls, getDetailContainer } from "../model/uischema"
import { tryFindByUUID } from "../util/schemasUtil"
import { getHierarchy } from "../util/tree"

export const NEW_UI_SCHEMA_ELEMENT = "newUiSchemaElement"
export const MOVE_UI_SCHEMA_ELEMENT = "moveUiSchemaElement"

const newUISchemaElement = (uiSchemaElement, schemaUUID) => ({
  type: NEW_UI_SCHEMA_ELEMENT,
  uiSchemaElement,
  schemaUUID
})

const moveUISchemaElement = (uiSchemaElement, schema) => ({
  type: MOVE_UI_SCHEMA_ELEMENT,
  uiSchemaElement,
  schema
})

export const DndItems = { newUISchemaElement, moveUISchemaElement }

export const canDropIntoLayout = (item, rootSchema, layout) => {
  // check scope changes
  const detailContainer = getDetailContainer(layout)
  return canDropIntoScope(item, rootSchema, detailContainer)
}

/**
 * Check whether the element to drop fits into the given scope,
 * e.g. whether a nested array object is dropped into the correct array ui schema control.
 *
 * @param item the drag and drop item
 * @param scopeUISchemaElement the nearest scope changing element,
 * e.g. the nearest array control into which shall be dropped.
 * Use `undefined` when dropping outside of any scope changing element.
 */
export const canDropIntoScope = (item, rootSchema, scopeUISchemaElement) => {
  const controlObject = tryFindByUUID(rootSchema, item.schemaUUID)
  if (controlObject) {
    const scopeSchemaElement = getScopeChangingContainer(controlObject)
    if (!scopesMatch(scopeSchemaElement, scopeUISchemaElement)) {
      return false
    }
  }
  return true
}

/**
 * Scopes match if they are linked or both don't exist.
 */
const scopesMatch = (schemaScope, uiScope) => {
  return uiScope?.linkedSchemaElement === schemaScope?.uuid
}

/**
 * Returns the closest scope changing schema container
 */
const getScopeChangingContainer = element => {
  // TODO check other cases than array
  return getArrayContainer(element)
}

export const canMoveSchemaElementTo = (item, target, index) => {
  const elementToMove = item.uiSchemaElement
  return (
    !isMoveRoot(elementToMove) &&
    !isMoveIntoItself(elementToMove, target) &&
    !isMoveNextToItself(elementToMove, target, index) &&
    !isMovingControlsInterScopes(elementToMove, target)
  )
}

const isMoveRoot = elementToMove => !elementToMove.parent
const isMoveIntoItself = (elementToMove, target) =>
  getHierarchy(target).includes(elementToMove)
const isMoveNextToItself = (elementToMove, target, index) => {
  if (target === elementToMove.parent) {
    const currentIndex = target.elements.indexOf(elementToMove)
    if (currentIndex === index || currentIndex === index - 1) {
      return true
    }
  }
  return false
}
const isMovingControlsInterScopes = (elementToMove, target) =>
  containsControls(elementToMove) &&
  getDetailContainer(elementToMove) !== getDetailContainer(target)
