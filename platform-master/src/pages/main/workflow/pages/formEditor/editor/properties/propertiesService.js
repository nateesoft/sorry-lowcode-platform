import { maxBy } from "lodash"

/**
 * Constant that indicates that a tester is not capable of handling
 * an EditorUISchemaElement.
 */
export const NOT_APPLICABLE = -1

export class PropertiesServiceImpl {
  constructor(schemaProviders, schemaDecorators) {
    this.schemaProviders = schemaProviders
    this.schemaDecorators = schemaDecorators
  }
  getProperties = (uiElement, schemaElement) => {
    const provider = maxBy(this.schemaProviders, p => p.tester(uiElement))
    if (!provider || provider.tester(uiElement) === NOT_APPLICABLE) {
      return undefined
    }
    const elementSchemas = provider.getPropertiesSchemas(
      uiElement,
      schemaElement
    )
    if (!elementSchemas) {
      return undefined
    }
    const decoratedSchemas = this.schemaDecorators.reduce(
      (schemas, decorator) => decorator(schemas, uiElement, schemaElement),
      elementSchemas
    )
    return decoratedSchemas
  }
}
