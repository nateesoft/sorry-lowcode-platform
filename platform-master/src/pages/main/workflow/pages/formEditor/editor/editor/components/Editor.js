import React from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import { createTheme, Grid, ThemeProvider } from "@mui/material"

import { useExportSchema } from "../../core/util/hooks"
import { EmptyEditor } from "./EmptyEditor"
import { useUiSchema } from "../../core/context"

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
  const uiSchema = useUiSchema()
  console.log('Editor(schema):', schema)
  console.log('Editor(uiSchema):', uiSchema)

  const handleChange = (evt) => {
    console.log('Editor:handleChange:', uiSchema)
    setUISchemaData(uiSchema)
  }

  return uiSchema ? (
    <Grid container sx={{height: "70vh", overflow: "scroll"}}>
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
