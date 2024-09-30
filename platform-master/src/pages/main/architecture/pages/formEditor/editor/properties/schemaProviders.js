import { NOT_APPLICABLE } from "./propertiesService"

export const propertySchemaProvider = {
  tester: uiElement => {
    if (uiElement) {
      // default schema provider
      return 1
    }
    return NOT_APPLICABLE
  },
  getPropertiesSchemas: () => ({
    schema: {
      type: "object",
      properties: {}
    },
    uiSchema: {
      type: "VerticalLayout",
      elements: []
    }
  })
}

export const defaultSchemaProviders = [propertySchemaProvider]
