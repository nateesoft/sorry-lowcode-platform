import React from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import { createTheme, Grid, ThemeProvider } from "@mui/material"

import { useUiSchema } from "../../core/context"
import { useExportSchema, useExportUiSchema } from "../../core/util/hooks"
import { EmptyEditor } from "./EmptyEditor"
import { jsonToText } from "../../core/util/schemasUtil"

const theme = createTheme({
  overrides: {
    MuiFormControl: {
      root: {
        overflow: "hidden"
      }
    }
  }
})

export const Editor = ({ editorRenderers, setUISchemaData }) => {
  const schema = useExportSchema()
  const uiSchema = useExportUiSchema()
  console.log('Editor(schema):', schema)
  console.log('Editor(uiSchema):', uiSchema)

  const handleChange = (evt) => {
    console.log('handleChange:', uiSchema)
    setUISchemaData(JSON.stringify(uiSchema))
    // console.log('handleChange(1):', JSON.parse(uiSchema))
    // console.log('handleChange(2):', JSON.stringify(uiSchema, null, 2))
  }

  return uiSchema ? (
    <Grid container>
      <ThemeProvider theme={theme}>
        <JsonForms
          data={{}}
          schema={schema}
          uischema={uiSchema}
          renderers={editorRenderers}
          cells={materialCells}
          onChange={handleChange}
        />
      </ThemeProvider>
    </Grid>
  ) : (
    <EmptyEditor />
  )
}
