import { memo } from "react"
import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import ActionButton from "./Button"

export const actionButtonTester = rankWith(3, uiTypeIs("ActionButton"))

const customComparator = (prevProps, nextProps) => {
  return nextProps.schema === prevProps.schema
}

export default withJsonFormsControlProps(memo(ActionButton, customComparator))
