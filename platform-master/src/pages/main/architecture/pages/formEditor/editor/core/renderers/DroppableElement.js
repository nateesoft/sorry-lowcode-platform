import React, { useMemo } from "react"
import { rankWith } from "@jsonforms/core"
import { JsonFormsDispatch } from "@jsonforms/react"
import { omit } from "lodash"

import { EditorElement } from "../../editor/components/EditorElement"
const DroppableElement = ({ uischema, schema, path, renderers, cells }) => {
  const editorUiSchema = useMemo(() => omit(uischema, ["rule"]), [uischema])
  return (
    <EditorElement wrappedElement={uischema}>
      <JsonFormsDispatch
        uischema={editorUiSchema}
        schema={schema}
        path={path}
        renderers={renderers?.filter(
          r => r.renderer !== DroppableElementRenderer
        )}
        cells={cells}
      />
    </EditorElement>
  )
}
const DroppableElementRenderer = DroppableElement
export const DroppableElementRegistration = {
  tester: rankWith(50, () => true),
  renderer: DroppableElementRenderer
}
