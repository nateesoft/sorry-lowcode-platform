import React from "react"
import { Typography } from "@mui/material"

import { Properties } from "./Properties"

export const PropertiesPanel = ({ propertyRenderers }) => {
  return (
    <>
      <Typography variant="h6" color="inherit" noWrap>
        Properties
      </Typography>
      <Properties propertyRenderers={propertyRenderers} />
    </>
  )
}
