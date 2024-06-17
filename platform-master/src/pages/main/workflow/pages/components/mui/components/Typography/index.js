import { rankWith, uiTypeIs } from "@jsonforms/core";
import { withJsonFormsControlProps } from "@jsonforms/react";
import { Typography } from "@mui/material";

const TypographyControl = withJsonFormsControlProps(props => {
    return <Typography>{props.label}</Typography>
})

export const typographyTester = rankWith(3, uiTypeIs('Typography'))
export default TypographyControl