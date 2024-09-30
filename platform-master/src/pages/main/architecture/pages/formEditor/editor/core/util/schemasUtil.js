import { isControl, isLayout } from "@jsonforms/core"
import { get } from "lodash"

export const isCalculatePathError = result => result?.id === "calulatePathError"
export const isGetPathError = result => result?.id === "getPathError"

export const isPathError = result =>
  isCalculatePathError(result) || isGetPathError(result)

export const isNoUUIDError = result => result?.id === "noUUIDError"
export const isGetByUUIDError = result => result?.id === "getByUUIDError"
export const isUUIDError = result =>
  isNoUUIDError(result) || isGetByUUIDError(result)

export const getRoot = element => {
  if (element?.parent) {
    return getRoot(element.parent)
  }
  return element
}

export const findByUUID = (element, uuid) => {
  const root = getRoot(element)
  const result = doFindByUUID(root, uuid)
  if (!result) {
    return {
      id: "getByUUIDError",
      root: root,
      uuid: uuid
    }
  }
  return result
}

export const tryFindByUUID = (element, uuid) => {
  if (!uuid || !element) return undefined
  const findResult = findByUUID(element, uuid)
  return isUUIDError(findResult) ? undefined : findResult
}

const doFindByUUID = (root, uuid) => {
  if (!uuid) {
    return {
      id: "noUUIDError"
    }
  }
  if (root && root.uuid === uuid) {
    return root
  }
  if (!root) {
    return undefined
  }
  const entries = root instanceof Map ? root.entries() : Object.entries(root)
  for (const [key, value] of Array.from(entries)) {
    if (value && value.uuid === uuid) {
      return value
    }
    if (typeof value === "object" && key !== "parent") {
      const result = doFindByUUID(value, uuid)
      if (result) {
        return result
      }
    }
    // some mappings are 'reversed'
    if (typeof key === "object") {
      const result = doFindByUUID(key, uuid)
      if (result) {
        return result
      }
    }
  }
  return undefined
}

export const calculatePath = (root, object) => {
  const path = doCalculatePath(root, object)
  if (!path) {
    return {
      id: "calulatePathError",
      root: root,
      element: object
    }
  }
  return path
}

export const getPathString = object => {
  const root = getRoot(object)
  const path = calculatePath(root, object)
  if (isPathError(path)) {
    return path
  }
  return `${path.join("/")}`
}

const doCalculatePath = (root, object) => {
  if (object.uuid && root.uuid === object.uuid) {
    return []
  }
  const entries = root instanceof Map ? root.entries() : Object.entries(root)
  for (const [key, value] of Array.from(entries)) {
    if (object.uuid && value?.uuid === object.uuid) {
      return [key]
    }
    // some mappings are 'reversed'
    if (object.uuid && key?.uuid === object.uuid) {
      return [value]
    }
    if (typeof value === "object" && key !== "parent") {
      const path = doCalculatePath(value, object)
      if (path) {
        return [key, ...path]
      }
    }
    // some mappings are 'reversed'
    if (typeof key === "object") {
      const path = doCalculatePath(key, object)
      if (path) {
        return [value, ...path]
      }
    }
  }
  return undefined
}

export const getFromPath = (root, path) => {
  const element = doGetFromPath(root, path)
  if (!element) {
    return {
      id: "getPathError",
      root: root,
      path: path
    }
  }
  return element
}

const doGetFromPath = (root, path) => {
  if (path.length === 0) {
    return root
  }
  const [pathElement, ...rest] = path
  if (root instanceof Map) {
    if (root.has(pathElement)) {
      return getFromPath(root.get(pathElement), rest)
    }
    // must be a reverse map
    const element = Array.from(root.entries()).reduce((acc, [key, value]) => {
      if (value === pathElement) {
        return key
      }
      return acc
    }, undefined)
    return getFromPath(element, rest)
  }
  return getFromPath(get(root, [pathElement]), rest)
}

export const linkElements = (uiSchemaElement, schemaElement) => {
  if (!uiSchemaElement.uuid) {
    console.error("Found element without UUID", uiSchemaElement)
    return false
  }

  ;(schemaElement.linkedUISchemaElements =
    schemaElement.linkedUISchemaElements || new Set()).add(uiSchemaElement.uuid)

  uiSchemaElement.linkedSchemaElement = schemaElement.uuid
  return true
}

export const linkSchemas = (schema, uiSchema) => {
  if (!schema || !uiSchema) {
    return { schema, uiSchema }
  }
  traverse(uiSchema, current => {
    if (isEditorControl(current)) {
      const linkedElement = getSchemaElementFromScope(schema, current.scope)
      if (linkedElement && !isPathError(linkedElement)) {
        linkElements(current, linkedElement)
      }
    }
  })
  return { schema, uiSchema }
}

export const traverse = (uiSchema, pre, context) =>
  doTraverse(uiSchema, pre, undefined, context)

const doTraverse = (uiSchema, pre, parent, context) => {
  pre(uiSchema, parent, context)
  if (uiSchema && isLayout(uiSchema)) {
    uiSchema.elements.forEach(el => doTraverse(el, pre, uiSchema, context))
  }
  if (uiSchema?.options?.detail) {
    doTraverse(uiSchema.options.detail, pre, uiSchema, context)
  }
  // TODO other containments like categorization
  return context
}

const getSchemaElementFromScope = (schema, scope) => {
  const schemaRoot = getRoot(schema)
  const validSegment = pathSegment =>
    pathSegment !== "#" && pathSegment !== undefined && pathSegment !== ""
  const validPathSegments = scope.split("/").filter(validSegment)
  return getFromPath(schemaRoot, validPathSegments)
}

export const jsonToText = object => JSON.stringify(object, null, 2)

const isEditorUISchemaElement = element => {
  return !!element?.type && !!element?.uuid
}

export const isEditorControl = element => {
  return isEditorUISchemaElement(element) && isControl(element)
}

export const isEditorLayout = element => {
  return isEditorUISchemaElement(element) && isLayout(element)
}
