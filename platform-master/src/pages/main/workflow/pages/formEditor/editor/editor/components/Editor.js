import React from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import { createTheme, Grid, ThemeProvider } from "@mui/material"

import { useExportSchema, useExportUiSchema } from "../../core/util/hooks"
import { EmptyEditor } from "./EmptyEditor"

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

  const handleChange = (evt) => {
    setUISchemaData(JSON.stringify(uiSchema))
  }

  return uiSchema ? (
    <Grid container sx={{height: "60vh", overflow: "scroll"}}>
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
