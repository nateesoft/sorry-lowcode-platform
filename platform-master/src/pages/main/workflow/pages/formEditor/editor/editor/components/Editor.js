import React from "react"
import { materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"
import { createTheme, Grid, ThemeProvider } from "@mui/material"

import { useUiSchema } from "../../core/context"
import { useExportSchema } from "../../core/util/hooks"
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

export const Editor = ({ editorRenderers }) => {
  const schema = useExportSchema()
  const uiSchema = useUiSchema()
  return uiSchema ? (
    <Grid container>
      <ThemeProvider theme={theme}>
        <JsonForms
          data={{}}
          schema={schema}
          uischema={uiSchema}
          renderers={editorRenderers}
          cells={materialCells}
        />
      </ThemeProvider>
    </Grid>
  ) : (
    <EmptyEditor />
  )
}
