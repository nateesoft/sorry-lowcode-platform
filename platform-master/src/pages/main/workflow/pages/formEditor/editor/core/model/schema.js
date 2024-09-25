import traverse from "json-schema-traverse"
import { assign, cloneDeep, omit } from "lodash"
import { v4 as uuid } from "uuid"

import { getHierarchy } from "../util/tree"

export const OBJECT = "object"
export const ARRAY = "array"
export const PRIMITIVE = "primitive"
export const OTHER = "other"

export const getChildren = schemaElement => {
  const children = []
  switch (schemaElement.type) {
    case OBJECT:
      children.push(...Array.from(schemaElement.properties.values()))
      break
    case ARRAY:
      const items = Array.isArray(schemaElement.items)
        ? schemaElement.items
        : [schemaElement.items]
      children.push(...items)
      break
    default:
      break
  }
  if (schemaElement.other) {
    children.push(...Array.from(schemaElement.other.values()))
  }
  return children
}

const containsAs = schemaElement => {
  const containments = []
  switch (schemaElement.type) {
    case OBJECT:
      const propertyEntries = Array.from(
        schemaElement.properties.entries()
      ).map(([prop, element]) => [element, `properties/${prop}`])
      containments.push(...propertyEntries)
      break
    case ARRAY:
      const itemEntries = Array.isArray(schemaElement.items)
        ? schemaElement.items.map((element, index) => [
            element,
            `items/${index}`
          ])
        : [[schemaElement.items, "items"]]
      containments.push(...itemEntries)
      break
    default:
      break
  }
  if (schemaElement.other) {
    const entries = Array.from(
      schemaElement.other.entries()
    ).map(([prop, element]) => [element, prop])
    containments.push(...entries)
  }
  return new Map(containments)
}

/** Calculates the full path from root to the given element */
export const getPath = schemaElement => {
  if (!schemaElement.parent) {
    return ""
  }
  return `${getPath(schemaElement.parent)}/${containsAs(
    schemaElement.parent
  ).get(schemaElement)}`
}

/**
 *  Calculates the scope for the given element.
 *  This is the same as `getPath` however it stops at array elements.
 */
export const getScope = schemaElement => {
  if (!schemaElement.parent || isArrayElement(schemaElement.parent)) {
    return ""
  }
  return `${getScope(schemaElement.parent)}/${containsAs(
    schemaElement.parent
  ).get(schemaElement)}`
}

export const toPrintableObject = debugSchema => {
  const clone = cloneDeep(debugSchema)
  const printableProps = {
    parent: debugSchema.parent?.uuid,
    linkedUISchemaElements: debugSchema.linkedUISchemaElements
      ? Array.from(debugSchema.linkedUISchemaElements.values())
      : undefined
  }
  switch (debugSchema.type) {
    case OBJECT:
      if (debugSchema.properties.size > 0) {
        printableProps.properties = Array.from(debugSchema.properties).map(
          ([key, value]) => {
            return { name: key, value: toPrintableObject(value) }
          }
        )
      }
      break
    case ARRAY:
      if (Array.isArray(debugSchema.items)) {
        printableProps.items = debugSchema.items.map(toPrintableObject)
      } else {
        printableProps.items = toPrintableObject(debugSchema.items)
      }
      break
    default:
      break
  }
  if (debugSchema.other) {
    printableProps.other = Array.from(debugSchema.other).map(([key, value]) => {
      return { name: key, value: toPrintableObject(value) }
    })
  }
  return assign(clone, printableProps)
}

const isElementOfType = type => schemaElement => schemaElement?.type === type
export const isObjectElement = isElementOfType(OBJECT)
export const isArrayElement = isElementOfType(ARRAY)
export const isPrimitiveElement = isElementOfType(PRIMITIVE)
export const isOtherElement = isElementOfType(OTHER)

export const getLabel = schemaElement => {
  if (schemaElement.schema.title) {
    return schemaElement.schema.title
  }
  if (isObjectElement(schemaElement.parent)) {
    for (const [prop, element] of Array.from(
      schemaElement.parent.properties.entries()
    )) {
      if (element === schemaElement) {
        return prop
      }
    }
  }
  if (
    isArrayElement(schemaElement.parent) &&
    Array.isArray(schemaElement.parent.items)
  ) {
    for (let i = 0; i < schemaElement.parent.items.length; i++) {
      if (schemaElement.parent.items[i] === schemaElement) {
        return `[${i}]`
      }
    }
  }
  return "<No label>"
}

const createNewElementForType = (schema, type) => {
  switch (type) {
    case OBJECT:
      const objectCopy = cloneDeep(omit(schema, ["properties"]))
      return { type, schema: objectCopy, properties: new Map(), uuid: uuid() }
    case ARRAY:
      const arrayCopy = cloneDeep(omit(schema, ["items"]))
      return { type, schema: arrayCopy, items: [], uuid: uuid() }
    case PRIMITIVE:
      return { type, schema: cloneDeep(schema), uuid: uuid() }
    default:
      return { type: OTHER, schema: cloneDeep(schema), uuid: uuid() }
  }
}

const createSingleElement = schema =>
  createNewElementForType(schema, determineType(schema))

const getUndefined = () => undefined

export const buildSchemaTree = schema => {
  // workaround needed because of TS compiler issue
  // https://github.com/Microsoft/TypeScript/issues/11498
  let currentElement = getUndefined()

  traverse(schema, {
    cb: {
      pre: (
        currentSchema,
        pointer,
        rootSchema,
        parentPointer,
        parentKeyword,
        parentSchema,
        indexOrProp
      ) => {
        const newElement = createSingleElement(currentSchema)
        newElement.parent = currentElement
        const path = pointer.split("/")
        if (
          isObjectElement(currentElement) &&
          path[path.length - 2] === "properties"
        ) {
          currentElement.properties.set(`${indexOrProp}`, newElement)
        } else if (
          isArrayElement(currentElement) &&
          path[path.length - 2] === "items"
        ) {
          currentElement.items.push(newElement)
        } else if (
          isArrayElement(currentElement) &&
          path[path.length - 1] === "items"
        ) {
          currentElement.items = newElement
        } else if (currentElement) {
          if (!currentElement.other) {
            currentElement.other = new Map()
          }
          currentElement.other.set(`${indexOrProp}`, newElement)
        }
        currentElement = newElement
      },
      post: () => {
        currentElement = currentElement?.parent || currentElement
      }
    }
  })

  if (!currentElement) {
    return undefined
  }

  return currentElement
}

const determineType = schema => {
  if (!schema) {
    return OTHER
  }
  if (schema.type) {
    switch (schema.type) {
      case "object":
        return OBJECT
      case "array":
        return ARRAY
      case "number":
      case "integer":
      case "string":
      case "boolean":
      case "const":
        return PRIMITIVE
      default:
        return OTHER
    }
  }
  if (schema.properties) {
    return OBJECT
  }
  if (schema.items) {
    return ARRAY
  }
  if (schema.enum) {
    return PRIMITIVE
  }
  return OTHER
}

export const buildJsonSchema = element => {
  const result = cloneDeep(element.schema)
  switch (element.type) {
    case OBJECT:
      if (element.properties.size > 0) {
        result.properties = {}
        element.properties.forEach((propertyElement, propName) => {
          result.properties[propName] = buildJsonSchema(propertyElement)
        })
      }
      break
    case ARRAY:
      if (Array.isArray(element.items)) {
        result.items = element.items.map(buildJsonSchema)
      } else {
        result.items = buildJsonSchema(element.items)
      }
      break
    default:
      break
  }
  return result
}

/** Removes all linkedUiSchemaElements from the given schema */
export const cleanLinkedElements = schema => {
  if (!schema) {
    return schema
  }

  delete schema.linkedUISchemaElements
  switch (schema.type) {
    case OBJECT:
      if (schema.properties.size > 0) {
        schema.properties = Array.from(schema.properties).reduce(
          (acc, [key, value]) => {
            const cleanedElement = cleanLinkedElements(value)
            if (cleanedElement) {
              acc.set(key, cleanedElement)
            }
            return acc
          },
          new Map()
        )
      }
      break
    case ARRAY:
      if (Array.isArray(schema.items)) {
        schema.items = schema.items
          .map(cleanLinkedElements)
          .filter(item => item !== undefined)
      } else {
        schema.items = cleanLinkedElements(schema.items) ?? []
      }
      break
    default:
      break
  }
  return schema
}

/**
 * Returns the closest array which contains the given element
 */
export const getArrayContainer = element =>
  getHierarchy(element)
    .splice(1)
    .find(isArrayElement)

export const generateEmptyData = (schema, data = {}) => {
  if (isObjectElement(schema)) {
    Array.from(schema.properties).forEach(([key, value]) => {
      if (isObjectElement(value)) {
        data[key] = generateEmptyData(value, {})
      }
    })
  }
  return data
}
