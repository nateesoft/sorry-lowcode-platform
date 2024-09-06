import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import TableData from './Table'

export const tableDataTester = rankWith(3, uiTypeIs('TableData'))

export default withJsonFormsControlProps(TableData)