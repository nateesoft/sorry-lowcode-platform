export const SET_SCHEMA = "jsonforms-editor/SET_SCHEMA"
export const SET_UISCHEMA = "jsonforms-editor/SET_UISCHEMA"
export const SET_SCHEMAS = "jsonforms-editor/SET_SCHEMAS"
export const ADD_SCOPED_ELEMENT_TO_LAYOUT =
  "jsonforms-editor/ADD_SCOPED_ELEMENT_TO_LAYOUT"
export const ADD_UNSCOPED_ELEMENT_TO_LAYOUT =
  "jsonforms-editor/ADD_UNSCOPED_ELEMENT_TO_LAYOUT"
export const MOVE_UISCHEMA_ELEMENT = "jsonforms-editor/MOVE_UISCHEMA_ELEMENT"
export const REMOVE_UISCHEMA_ELEMENT =
  "jsonforms-editor/REMOVE_UISCHEMA_ELEMENT"
export const UPDATE_UISCHEMA_ELEMENT =
  "jsonforms-editor/UPDATE_UISCHEMA_ELEMENT"
export const ADD_DETAIL = "jsonforms-editor/ADD_DETAIL"

const setSchema = schema => ({
  type: SET_SCHEMA,
  schema
})

const setUiSchema = uiSchema => ({
  type: SET_UISCHEMA,
  uiSchema
})

const setSchemas = (schema, uiSchema) => ({
  type: SET_SCHEMAS,
  schema,
  uiSchema
})

const addScopedElementToLayout = (
  uiSchemaElement,
  layoutUUID,
  index,
  schemaUUID
) => ({
  type: ADD_SCOPED_ELEMENT_TO_LAYOUT,
  uiSchemaElement,
  layoutUUID,
  index,
  schemaUUID
})

const addUnscopedElementToLayout = (uiSchemaElement, layoutUUID, index) => ({
  type: ADD_UNSCOPED_ELEMENT_TO_LAYOUT,
  uiSchemaElement,
  layoutUUID,
  index
})

const moveUiSchemaElement = (
  elementUUID,
  newContainerUUID,
  index,
  schemaUUID
) => ({
  type: MOVE_UISCHEMA_ELEMENT,
  elementUUID,
  newContainerUUID,
  index,
  schemaUUID
})

const removeUiSchemaElement = elementUUID => ({
  type: REMOVE_UISCHEMA_ELEMENT,
  elementUUID
})

const updateUISchemaElement = (elementUUID, changedProperties) => ({
  type: UPDATE_UISCHEMA_ELEMENT,
  elementUUID,
  changedProperties
})

const addDetail = (uiSchemaElementId, detail) => ({
  type: ADD_DETAIL,
  uiSchemaElementId,
  detail
})

export const Actions = {
  setSchema,
  setUiSchema,
  setSchemas,
  addScopedElementToLayout,
  addUnscopedElementToLayout,
  moveUiSchemaElement,
  removeUiSchemaElement,
  updateUISchemaElement,
  addDetail
}
