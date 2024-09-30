import { assign } from "lodash"

import { withCloneTree, withCloneTrees } from "../util/clone"
import {
  findByUUID,
  getRoot,
  isEditorControl,
  isEditorLayout,
  isUUIDError,
  linkElements,
  linkSchemas,
  traverse
} from "../util/schemasUtil"
import {
  ADD_DETAIL,
  ADD_SCOPED_ELEMENT_TO_LAYOUT,
  ADD_UNSCOPED_ELEMENT_TO_LAYOUT,
  MOVE_UISCHEMA_ELEMENT,
  REMOVE_UISCHEMA_ELEMENT,
  SET_SCHEMA,
  SET_SCHEMAS,
  SET_UISCHEMA,
  UPDATE_UISCHEMA_ELEMENT
} from "./actions"
import { buildSchemaTree, cleanLinkedElements } from "./schema"
import { buildEditorUiSchemaTree, cleanUiSchemaLinks } from "./uischema"

export const uiSchemaReducer = (uiSchema, action) => {
  switch (action.type) {
    case ADD_UNSCOPED_ELEMENT_TO_LAYOUT:
      return uiSchema
        ? withCloneTree(uiSchema, action.layoutUUID, uiSchema, newUiSchema => {
            const newUIElement = action.uiSchemaElement
            newUIElement.parent = newUiSchema
            newUiSchema.elements.splice(action.index, 0, newUIElement)
            return getRoot(newUiSchema)
          })
        : uiSchema
    case UPDATE_UISCHEMA_ELEMENT:
      return uiSchema
        ? withCloneTree(uiSchema, action.elementUUID, uiSchema, newUiSchema => {
            // options.detail is not part of the editable properties
            const optionsDetail = newUiSchema.options?.detail
            assign(newUiSchema, action.changedProperties)
            if (optionsDetail && !newUiSchema.options?.detail) {
              newUiSchema.options = newUiSchema.options || {}
              newUiSchema.options.detail = optionsDetail
            }
            return getRoot(newUiSchema)
          })
        : uiSchema
    default:
      break
  }
  // fallback - do nothing
  return uiSchema
}

export const combinedReducer = (state, action) => {
  switch (action.type) {
    case SET_SCHEMA:
      return withCloneTree(state.uiSchema, undefined, state, clonedUiSchema => {
        return linkSchemas(
          buildSchemaTree(action.schema),
          cleanUiSchemaLinks(clonedUiSchema)
        )
      })
    case SET_UISCHEMA:
      return withCloneTree(state.schema, undefined, state, clonedSchema => {
        state.categorizationService?.clearTabSelections()
        return linkSchemas(
          cleanLinkedElements(clonedSchema),
          buildEditorUiSchemaTree(action.uiSchema)
        )
      })
    case SET_SCHEMAS:
      return linkSchemas(
        buildSchemaTree(action.schema),
        buildEditorUiSchemaTree(action.uiSchema)
      )
    case ADD_SCOPED_ELEMENT_TO_LAYOUT:
      return withCloneTrees(
        state.uiSchema,
        action.layoutUUID,
        state.schema,
        action.schemaUUID,
        state,
        (newUiSchema, newSchema) => {
          const newUIElement = action.uiSchemaElement
          newUIElement.parent = newUiSchema
          newUiSchema.elements.splice(action.index, 0, newUIElement)

          if (!newSchema || !linkElements(newUIElement, newSchema)) {
            console.error("Could not add new UI element", newUIElement)
            return state
          }

          return {
            schema: getRoot(newSchema),
            uiSchema: getRoot(newUiSchema)
          }
        }
      )
    case MOVE_UISCHEMA_ELEMENT:
      return withCloneTrees(
        state.uiSchema,
        action.newContainerUUID,
        state.schema,
        action.schemaUUID,
        state,
        (newContainer, newSchema) => {
          const elementToMove = findByUUID(newContainer, action.elementUUID)
          if (isUUIDError(elementToMove)) {
            console.error(
              "Could not find corresponding element ",
              elementToMove
            )
            return state
          }
          const oldParentUUID = elementToMove.parent?.uuid
          const oldIndexInParent = elementToMove.parent
            ? elementToMove.parent.elements.indexOf(elementToMove)
            : -1
          const removeResult = removeUiElement(elementToMove, newSchema)
          if (isUUIDError(removeResult)) {
            console.error("Could not remove ui element ", removeResult)
            return state
          }

          // link child and new parent
          elementToMove.parent = newContainer
          if (newContainer && isEditorLayout(newContainer)) {
            const moveRightInSameParent =
              action.newContainerUUID === oldParentUUID &&
              oldIndexInParent !== -1 &&
              oldIndexInParent < action.index

            // we need to adapt the index as we removed the element previously
            const indexToUse = moveRightInSameParent
              ? action.index - 1
              : action.index
            newContainer.elements.splice(indexToUse, 0, elementToMove)
          } else if (newContainer && isEditorControl(newContainer)) {
            newContainer.options = {
              ...newContainer.options,
              detail: elementToMove
            }
          } else {
            // TODO other cases
            console.error("Move encountered an invalid case")
            return state
          }

          // add linkedUISchemaElements in the schema (for scoped ui elements) if such links existed before
          if (elementToMove.linkedSchemaElement) {
            // newSchema can't be undefined when the old ui element had links to it
            ;(newSchema.linkedUISchemaElements =
              newSchema.linkedUISchemaElements || new Set()).add(
              elementToMove.uuid
            )
          }

          // schema is optional in this action
          const schemaToReturn =
            action.schemaUUID !== undefined ? getRoot(newSchema) : state.schema

          return {
            schema: schemaToReturn,
            uiSchema: getRoot(newContainer)
          }
        }
      )
    case REMOVE_UISCHEMA_ELEMENT:
      return withCloneTrees(
        state.uiSchema,
        action.elementUUID,
        state.schema,
        undefined,
        state,
        (elementToRemove, newSchema) => {
          if (!elementToRemove) {
            console.error("Could not remove ui element ", elementToRemove)
            return state
          }
          const removeResult = removeUiElement(
            elementToRemove,
            newSchema,
            state.categorizationService
          )
          if (isUUIDError(removeResult)) {
            console.error("Could not remove ui element ", removeResult)
            return state
          }
          // check whether the element to remove was the root element
          const uiSchemaToReturn = elementToRemove.parent
            ? getRoot(elementToRemove)
            : undefined
          return {
            schema: newSchema,
            uiSchema: uiSchemaToReturn
          }
        }
      )
    case ADD_DETAIL:
      return withCloneTrees(
        state.schema,
        undefined,
        state.uiSchema,
        undefined,
        state,
        (schema, uiSchema) => {
          const elementForDetail = findByUUID(
            uiSchema,
            action.uiSchemaElementId
          )
          if (isUUIDError(elementForDetail)) {
            console.error(
              "Could not find ui schema element with id",
              elementForDetail
            )
            return state
          }
          // link all new ui schema elements
          const linkResult = traverse(
            action.detail,
            (uiSchemaElement, _parent, acc) => {
              if (uiSchemaElement.linkedSchemaElement) {
                const schemaElementToLink = findByUUID(
                  schema,
                  uiSchemaElement.linkedSchemaElement
                )
                if (isUUIDError(schemaElementToLink)) {
                  console.error(
                    "Could not find schema element with id",
                    schemaElementToLink
                  )
                  acc.error = true
                }
                ;(schemaElementToLink.linkedUISchemaElements =
                  schemaElementToLink.linkedUISchemaElements || new Set()).add(
                  action.detail.uuid
                )
              }
            },
            { error: false }
          )
          if (linkResult.error) {
            return state
          }

          elementForDetail.options = elementForDetail.options || {}
          elementForDetail.options.detail = action.detail
          action.detail.parent = elementForDetail
          return { schema, uiSchema }
        }
      )
    default:
      break
  }
  // fallback - do nothing
  return state
}

/** Removes the given UI element from its tree.
 *  If a SchemaElement is provided, the element to remove will be cleaned up from all linkedUISchemaElements fields in the schema.
 */
const removeUiElement = (elementToRemove, schema, categorizationService) => {
  // remove links to UI element in the schema (if any)
  if (schema && elementToRemove.linkedSchemaElement) {
    const uuidToRemove = elementToRemove.uuid
    if (!uuidToRemove) {
      return { id: "noUUIDError", element: elementToRemove }
    }
    const schemaRoot = getRoot(schema)
    const linkedSchemaElement = findByUUID(
      schemaRoot,
      elementToRemove.linkedSchemaElement
    )
    if (!isUUIDError(linkedSchemaElement)) {
      linkedSchemaElement.linkedUISchemaElements?.delete(uuidToRemove)
    }
  }

  // remove from parent
  if (elementToRemove.parent) {
    // - case: Layout
    if (elementToRemove.parent.elements) {
      const index = elementToRemove.parent.elements.indexOf(elementToRemove)
      if (index !== -1) {
        elementToRemove.parent.elements.splice(index, 1)
      }
    }
    // - case: element with detail
    if (elementToRemove.parent.options?.detail === elementToRemove) {
      delete elementToRemove.parent.options.detail
      if (Object.keys(elementToRemove.parent.options).length === 0) {
        delete elementToRemove.parent.options
      }
    }

    // TODO other cases
  }

  // - case: categorization/category element
  if (
    elementToRemove.type === "Categorization" ||
    elementToRemove.type === "Category"
  ) {
    // release the map entry memory
    categorizationService?.removeElement(elementToRemove)
  }

  return true
}

export const editorReducer = (state, action) => {
  switch (action.type) {
    case ADD_UNSCOPED_ELEMENT_TO_LAYOUT:
    case UPDATE_UISCHEMA_ELEMENT:
      return {
        schema: state.schema,
        uiSchema: uiSchemaReducer(state.uiSchema, action),
        categorizationService: state.categorizationService
      }
    case SET_SCHEMA:
    case SET_UISCHEMA:
    case SET_SCHEMAS:
    case ADD_SCOPED_ELEMENT_TO_LAYOUT:
    case MOVE_UISCHEMA_ELEMENT:
    case REMOVE_UISCHEMA_ELEMENT:
    case ADD_DETAIL:
      const combinedReducerResult = combinedReducer(state, action)
      // preserve the service
      combinedReducerResult.categorizationService = state.categorizationService
      return combinedReducerResult
    default:
      break
  }
  // fallback - do nothing
  return state
}
