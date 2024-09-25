import { v4 as uuid } from "uuid"

import { getScope } from "../../model"

export const createControl = schemaElement => {
  return createControlWithScope(`#${getScope(schemaElement)}`)
}

export const createControlWithScope = scope => {
  return {
    type: "Control",
    scope: scope,
    uuid: uuid()
  }
}

export const createLayout = type => {
  return {
    type: type,
    elements: [],
    uuid: uuid()
  }
}

export const createLabel = text => {
  return {
    type: "Label",
    text: text,
    uuid: uuid()
  }
}

export const createCategory = label => {
  return {
    type: "Category",
    elements: [],
    label: label,
    uuid: uuid()
  }
}

export const createCategorization = label => {
  return {
    type: "Categorization",
    label: label,
    uuid: uuid(),
    elements: []
  }
}
