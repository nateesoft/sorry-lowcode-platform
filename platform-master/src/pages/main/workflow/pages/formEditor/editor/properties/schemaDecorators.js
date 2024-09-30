import { assign } from "lodash"

export const multilineStringOptionDecorator = (
  schemas,
  uiElement,
  schemaElement
) => {
  if (
    schemaElement?.schema.type === "string" &&
    !schemaElement?.schema.format &&
    uiElement.type === "Control"
  ) {
    addSchemaOptionsProperty(schemas.schema, {
      multi: { type: "boolean" }
    })
    schemas.uiSchema.elements.push(
      createPropertyControl("#/properties/options/properties/multi")
    )
  }
  return schemas
}

export const labelUIElementDecorator = (schemas, uiElement) => {
  if (uiElement?.type === "Label") {
    assign(schemas.schema.properties, { text: { type: "string" } })

    schemas.uiSchema.elements.push(createPropertyControl("#/properties/text"))
  }
  return schemas
}

export const ruleDecorator = schemas => {
  assign(schemas.schema.properties, {
    rule: {
      type: "object"
    }
  })
  schemas.uiSchema.elements.push(createPropertyControl("#/properties/rule"))
  return schemas
}

export const labelDecorator = (schemas, uiElement) => {
  if (
    ["Group", "Control", "Categorization", "Category"].includes(uiElement?.type)
  ) {
    if (!schemas.schema.properties) {
      schemas.schema.properties = {}
    }
    assign(schemas.schema.properties, { label: { type: "string" } })

    schemas.uiSchema.elements.push(createPropertyControl("#/properties/label"))
  }
  return schemas
}

export const addSchemaOptionsProperty = (schema, newOption) => {
  if (!schema.properties) {
    schema.properties = {}
  }
  if (!schema.properties.options) {
    schema.properties.options = {
      type: "object",
      properties: {}
    }
  }
  assign(schema.properties.options.properties, newOption)
}

export const createPropertyControl = controlScope => ({
  type: "Control",
  scope: controlScope
})

export const defaultSchemaDecorators = [
  labelDecorator,
  multilineStringOptionDecorator,
  labelUIElementDecorator,
  ruleDecorator
]
