import React from "react"

import { useExportSchema, useExportUiSchema } from "../../core/util/hooks"

export const EditorPreview = () => {
  const schema = useExportSchema()
  const uiSchema = useExportUiSchema()

  const inputSchema = JSON.stringify(schema)
  const inputUISchema = JSON.stringify(uiSchema)

  return inputUISchema && inputSchema ? (
    <div>
      <ng-jsonforms
        uischema={inputUISchema}
        schema={inputSchema}
      ></ng-jsonforms>
    </div>
  ) : null
}
