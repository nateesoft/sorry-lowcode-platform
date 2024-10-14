import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { Stack } from "@mui/material"

import { setDefaultVal } from "../../../../../components/mui/utils"
import { DroppableLayout } from "../DroppableLayout"

const GridLayout = (props) => {
  const { uischema } = props
  const options = setDefaultVal(uischema.options, {})
  const style = setDefaultVal(options.style, "")
  return (
    <Stack {...style}>
      <DroppableLayout {...props} layout={uischema} direction={"row"} />
    </Stack>
  )
}

export const DroppableGridLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("GridLayout")),
  renderer: withJsonFormsLayoutProps(GridLayout)
}
