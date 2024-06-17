import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import ActionButton from './Button'

export const actionButtonTester = rankWith(3, uiTypeIs('ActionButton'))

export default withJsonFormsControlProps(ActionButton)