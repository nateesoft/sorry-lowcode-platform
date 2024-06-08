import React, { useState } from "react"
import { materialRenderers, materialCells } from "@jsonforms/material-renderers"
import { JsonForms } from "@jsonforms/react"

import uischema from "./uischema.json"
import schema from "./schema.json"
import { Grid } from "@mui/material"

const initialData = {
  "name": "John Doe",
  "vegetarian": false,
  "birthDate": "1985-06-02",
  "personalData": {
    "age": 34
  },
  "postalCode": "12345"
}

function JsonFormPage(props) {
  const [data, setData] = useState(initialData)

  return (
    <Grid container spacing={1}>
      <div style={{width: '100%', margin: '1.5rem', marginTop: '1.5rem'}}>
        <div style={{margin: 'auto'}}>
          <JsonForms
            schema={schema}
            uischema={uischema}
            data={data}
            renderers={materialRenderers}
            cells={materialCells}
            onChange={({ data, _errors }) => setData(data)}
          />
        </div>
      </div>
    </Grid>
  )
}

export default JsonFormPage
