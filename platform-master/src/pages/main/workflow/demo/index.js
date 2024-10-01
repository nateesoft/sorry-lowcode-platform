import React from "react"
import { JsonForms } from "@jsonforms/react"
import { createAjv } from "@jsonforms/core"
import { materialCells } from "@jsonforms/material-renderers"

import schema from "../pages/schema.json"
import uischema from "../pages/uischema.json"
import data from "../pages/data.json"
import { renderers } from "../pages/components/renderers"
import { Box } from "@mui/material"
import { useParams } from "react-router-dom"

function localLoad(pageKey, temp) {
  const haveData = JSON.parse(localStorage.getItem(pageKey))
  if (haveData) {
    return haveData
  }

  return temp
}

const DemoPage = (props) => {
  console.log('DemoPage:', props)

  const { formId } = useParams()

  const ajv = createAjv({ useDefaults: true })
  const loadSchema = localLoad(formId + "_template_schema", schema)
  const loadUiSchema = localLoad(formId + "_template_uischema", uischema)
  const loadData = localLoad(formId + "_template_data", data)

  return (
    <Box padding={2}>
      <JsonForms
        ajv={ajv}
        data={loadData}
        schema={loadSchema}
        uischema={loadUiSchema}
        renderers={renderers}
        cells={materialCells}
      />
    </Box>
  )
}

export default DemoPage
