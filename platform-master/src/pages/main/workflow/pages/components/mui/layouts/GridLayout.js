import React, { memo } from "react"
import { Stack } from "@mui/material"
import { JsonFormsDispatch, withJsonFormsLayoutProps } from "@jsonforms/react"
import { rankWith, uiTypeIs } from "@jsonforms/core"

import {setDefaultVal} from '../utils'

const GridLayout = (props) => {
  const { uischema, schema, path, enabled, renderers, cells } = props
  const elements = setDefaultVal(uischema.elements, [])
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")

  return (
    <Stack {...style}>
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

const customComparator = (prevProps, nextProps) => {
  return nextProps.schema === prevProps.schema
}

export const gridLayoutTester = rankWith(1000, uiTypeIs("GridLayout"))
export default withJsonFormsLayoutProps(memo(GridLayout, customComparator))
