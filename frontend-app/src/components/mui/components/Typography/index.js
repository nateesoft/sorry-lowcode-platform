import { rankWith, uiTypeIs } from "@jsonforms/core"
import { withJsonFormsControlProps } from "@jsonforms/react"
import { Typography } from "@mui/material"
import { getLabelValue } from "../../utils"

const TypographyControl = withJsonFormsControlProps((props) => {
    let label = getLabelValue(props.label, props.data)
  return <Typography>{label}</Typography>
})

export const typographyTester = rankWith(3, uiTypeIs("Typography"))
export default TypographyControl
