import React from "react"

import { useDispatch, useSchema } from "../../core/context"
import { Actions, toPrintableObject } from "../../core/model"
import { jsonToText, useExportSchema } from "../../core/util"
import { env } from "../../env"
import { SchemaJson } from "./SchemaJson"

export const JsonSchemaPanel = ({ title = "JSON Schema" }) => {
  const dispatch = useDispatch()
  const exportSchema = useExportSchema()
  const schema = useSchema()
  const showDebugSchema = env().DEBUG === "true"
  const handleSchemaUpdate = newSchema => {
    try {
      const newSchemaObject = JSON.parse(newSchema)
      dispatch(Actions.setSchema(newSchemaObject))
      return {
        success: true
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        return {
          success: false,
          message: error.message
        }
      }
      // unknown error type
      throw error
    }
  }
  return (
    <SchemaJson
      title={title}
      schema={jsonToText(exportSchema)}
      debugSchema={
        schema && showDebugSchema
          ? jsonToText(toPrintableObject(schema))
          : undefined
      }
      type="JSON Schema"
      updateSchema={handleSchemaUpdate}
    />
  )
}
