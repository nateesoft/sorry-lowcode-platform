import React from 'react';
import { withJsonFormsLayoutProps } from "@jsonforms/react"
import { rankWith, uiTypeIs, JsonSchema, UISchemaElement } from "@jsonforms/core"

const CustomHorizontal: React.FC<{}> = () => {
  return (
    <div>Custom Horizontal Layout</div>
  )
}

const CustomHorizontalLayout = ({}) => (
  <CustomHorizontal />
)

export const customHorizontalLayoutTester = rankWith(45, uiTypeIs("CustomHorizontalLayout"))
export default withJsonFormsLayoutProps(CustomHorizontalLayout)