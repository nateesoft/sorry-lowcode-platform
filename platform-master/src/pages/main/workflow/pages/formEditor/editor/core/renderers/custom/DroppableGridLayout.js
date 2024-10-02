import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react"
import { Stack } from "@mui/material"

import { setDefaultVal } from "../../../../../components/mui/utils"
import { DroppableLayout } from "../DroppableLayout"

const GridLayout = (props) => {
  const { uischema, schema, path, enabled, renderers, cells } = props
  const elements = setDefaultVal(uischema.elements, [])
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")
  return (
    <Stack {...style}>
      <DroppableLayout {...props} layout={uischema} direction={"row"} />
      {elements.map((child, index) => (
        <JsonFormsDispatch
          uischema={child}
          schema={schema}
          path={path}
          enabled={enabled}
          renderers={renderers}
          cells={cells}
        />
      ))}
    </Stack>
  )
}

export const DroppableGridLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("GridLayout")),
  renderer: withJsonFormsLayoutProps(GridLayout)
}
