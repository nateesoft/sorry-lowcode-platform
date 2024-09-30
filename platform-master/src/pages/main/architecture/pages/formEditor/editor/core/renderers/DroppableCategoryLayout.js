import React from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { Card, CardContent } from "@mui/material"

import { DroppableLayout } from "./DroppableLayout"

const CategoryLayout = props => {
  const { uischema } = props
  const categoryLayout = uischema
  return (
    <Card>
      <CardContent>
        <DroppableLayout
          {...props}
          layout={categoryLayout}
          direction={"column"}
        />
      </CardContent>
    </Card>
  )
}

export const DroppableCategoryLayoutRegistration = {
  tester: rankWith(45, uiTypeIs("Category")),
  renderer: withJsonFormsLayoutProps(CategoryLayout)
}
